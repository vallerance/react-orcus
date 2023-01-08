ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION} AS install

FROM node:18-alpine

COPY --from=install package.json .
COPY --from=install package-lock.json .
COPY --from=install tools tools
COPY --from=install .eslintrc.json .eslintrc.json
COPY --from=install .prettierrc .prettierrc
COPY --from=install babel.config.json babel.config.json
COPY --from=install tsconfig.base.json tsconfig.base.json
COPY --from=install nx.json nx.json
COPY --from=install README.md README.md
COPY --from=install LICENSE LICENSE

COPY packages packages

# Codefresh can't support the memory overhead of just `npm run build`
RUN npm run nx -- run react-orcus:build-tsc-babel
RUN npm run nx -- run react-orcus:build-webpack:development
RUN npm run nx -- run react-orcus:build-production
