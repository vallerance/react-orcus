FROM node:18-alpine

RUN apk add bash

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY package.json .
COPY package-lock.json .

RUN npm ci
