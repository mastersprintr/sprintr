FROM node:8.3.0-alpine
MAINTAINER mastersprintr@gmail.com

# Obnoxious fix for a very weird error
# RUN apk add --update nodejs nodejs-npm && npm install npm@latest -g

ENV http_proxy=http://10.138.15.10:8080 https_proxy=http://10.138.15.10:8080

RUN apk update && apk add bash

RUN npm config set proxy http://10.138.15.10:8080
RUN npm config set https_proxy http://10.138.15.10:8080

RUN npm update -g

RUN echo "cd /app; npm install; npm start" > /usr/local/bin/npm_install_at_start.sh
ENTRYPOINT bin/bash /usr/local/bin/npm_install_at_start.sh