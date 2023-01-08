FROM vallerance/react-orcus:latest

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY . .

RUN npm run build
