FROM node:18-alpine

RUN mkdir -p /usr/src/status

WORKDIR /usr/src/status

RUN npm install axios

COPY status.js .

ENTRYPOINT ["node", "status.js"]

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ARG CF_REVISION
ENV CF_REVISION=${CF_REVISION}
ARG CF_BUILD_URL
ENV CF_BUILD_URL=${CF_BUILD_URL}
