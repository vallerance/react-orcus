ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION}

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY . .

# Codefresh can't support the memory overhead of just `npm run build`
RUN npm run nx -- run react-orcus:build-tsc-babel
RUN npm run nx -- run react-orcus:build-webpack:development
RUN npm run nx -- run react-orcus:build-production
