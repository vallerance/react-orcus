FROM node:18-alpine

RUN apk add bash

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY package.json .
COPY package-lock.json .

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
