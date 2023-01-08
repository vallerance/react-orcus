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

ENTRYPOINT npm test
