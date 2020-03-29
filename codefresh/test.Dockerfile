#FROM justinribeiro/chrome-headless:stable
FROM selenium/standalone-chrome:3.141.59-zirconium

# install utils
USER root
RUN apt update
RUN apt install -y curl wget git

# install NodeJS
#RUN snap install node --classic --channel=12
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

# copy app files
#USER chrome
#WORKDIR /home/chrome
USER seluser
WORKDIR /home/seluser
RUN rm -rf .npm
COPY --chown=seluser:seluser . ./

# install app
RUN npm install

ENTRYPOINT npm run minify && npm test
