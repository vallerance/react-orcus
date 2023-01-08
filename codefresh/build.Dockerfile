ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION}

COPY packages packages
COPY tools tools
COPY .eslintrc.json .eslintrc.json
COPY .prettierrc .prettierrc
COPY babel.config.json babel.config.json
COPY jest.config.ts jest.config.ts
COPY jest.preset.js jest.preset.js
COPY tsconfig.base.json tsconfig.base.json
COPY nx.json nx.json

# Codefresh can't support the memory overhead of just `npm run build`
RUN npm run nx -- run react-orcus:build-tsc-babel
RUN npm run nx -- run react-orcus:build-webpack:development
RUN npm run nx -- run react-orcus:build-production
