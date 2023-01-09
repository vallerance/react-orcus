ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION} AS install

#FROM justinribeiro/chrome-headless:stable
FROM selenium/standalone-chrome:108.0-20221219

# install utils
USER root
RUN apt update
RUN apt install -y curl wget git

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
COPY --chown=seluser:seluser . ./

COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/package.json package.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/package-lock.json package-lock.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/node_modules node_modules

COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/tools tools
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/.eslintrc.json .eslintrc.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/.prettierrc .prettierrc
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/babel.config.json babel.config.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/tsconfig.base.json tsconfig.base.json
COPY --from=install --chown=seluser:seluser /usr/src/react-orcus/nx.json nx.json
