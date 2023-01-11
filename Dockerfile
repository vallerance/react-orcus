FROM node:18-alpine AS install

RUN apk add bash

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY tools tools
COPY .eslintrc.json .eslintrc.json
COPY .prettierrc .prettierrc
COPY babel.config.json babel.config.json
COPY jest.config.ts jest.config.ts
COPY jest.preset.js jest.preset.js
COPY tsconfig.base.json tsconfig.base.json
COPY nx.json nx.json
COPY README.md README.md
COPY LICENSE LICENSE

COPY packages packages



FROM install AS lint

ENTRYPOINT npm run lint



FROM install AS build

# Codefresh can't support the memory overhead of just `npm run build`
RUN npm run nx -- run react-orcus:build-tsc-babel
# For some reason, using the npm scripts results in a inexplicable failure of
# the build commands when run in docker
RUN until node_modules/.bin/nx run react-orcus:build-webpack:development -- --verbose; do sleep 1; done
RUN node_modules/.bin/nx run react-orcus:build-production



#FROM justinribeiro/chrome-headless:stable
FROM selenium/standalone-chrome:108.0-20221219 AS test

# install utils
USER root
RUN apt-get update
RUN apt-get install -y curl wget git

# install NodeJS
#RUN snap install node --classic --channel=12
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# copy app files
#USER chrome
#WORKDIR /home/chrome
USER seluser
WORKDIR /home/seluser
RUN rm -rf .npm

COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/package.json package.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/package-lock.json package-lock.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/node_modules node_modules

COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/tools tools
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/.eslintrc.json .eslintrc.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/.prettierrc .prettierrc
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/babel.config.json babel.config.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/jest.config.ts jest.config.ts
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/jest.preset.js jest.preset.js
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/tsconfig.base.json tsconfig.base.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/nx.json nx.json

COPY --from=build --chown=seluser:seluser /usr/src/react-orcus/packages packages
COPY --from=build --chown=seluser:seluser /usr/src/react-orcus/dist dist

ENTRYPOINT npm run nx -- run-many --target test --all --exclude default --parallel=1 && \
    npm run nx -- run-many --target e2e --all --exclude default --parallel=1



FROM build AS release

RUN apk add git

ARG GITHUB_USER
ARG GITHUB_EMAIL
RUN git config --global user.name ${GITHUB_USER}
RUN git config --global user.email ${GITHUB_EMAIL}

COPY codefresh/release.js .

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

COPY .git .git

ENTRYPOINT [ "node", "release.js" ]
