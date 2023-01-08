ARG VERSION=latest
FROM ghcr.io/vallerance/react-orcus:${VERSION}

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY . .

RUN npm run build -- --memoryLimit 256
