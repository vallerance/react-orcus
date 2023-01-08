ARG PARENT_IMAGE=ubuntu
FROM $PARENT_IMAGE

RUN mkdir -p /usr/src/react-orcus

WORKDIR /usr/src/react-orcus

COPY . .

RUN npm run build
