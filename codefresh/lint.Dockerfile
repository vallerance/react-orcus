ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION} AS install

FROM node:18-alpine

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY --from=install /usr/src/react-orcus/package.json package.json
COPY --from=install /usr/src/react-orcus/package-lock.json package-lock.json
COPY --from=install /usr/src/react-orcus/node_modules node_modules

COPY --from=install /usr/src/react-orcus/tools tools
COPY --from=install /usr/src/react-orcus/.eslintrc.json .eslintrc.json
COPY --from=install /usr/src/react-orcus/.prettierrc .prettierrc
COPY --from=install /usr/src/react-orcus/tsconfig.base.json tsconfig.base.json
COPY --from=install /usr/src/react-orcus/nx.json nx.json
COPY --from=install /usr/src/react-orcus/README.md README.md
COPY --from=install /usr/src/react-orcus/LICENSE LICENSE

COPY packages packages

ENTRYPOINT npm run lint