FROM node:10.6-alpine
WORKDIR /app
COPY package*.json /app/
RUN apk --no-cache --virtual build-dependencies add \
    krb5-dev \
    python \
    make \
    g++ \
    && npm install --quiet \
    && apk del build-dependencies
COPY . /app
EXPOSE 3030
