ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION}

COPY packages packages
COPY README.md README.md
COPY LICENSE LICENSE
COPY demo.gif demo.gif

# Codefresh can't support the memory overhead of just `npm run build`
RUN npm run nx -- run react-orcus:build-tsc-babel
RUN npm run nx -- run react-orcus:build-webpack:development
RUN npm run nx -- run react-orcus:build-production
