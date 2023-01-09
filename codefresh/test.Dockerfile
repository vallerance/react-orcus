ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION} AS install

FROM ghcr.io/vallerance/react-orcus-build:${VERSION} as build

#FROM justinribeiro/chrome-headless:stable
FROM selenium/standalone-chrome:108.0-20221219

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