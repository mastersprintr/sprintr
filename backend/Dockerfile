FROM node:alpine
MAINTAINER mastersprintr@gmail.com

# ENV http_proxy=http://10.138.15.10:8080 https_proxy=http://10.138.15.10:8080

RUN apk update && apk add bash

# RUN npm config set proxy http://10.138.15.10:8080
# RUN npm config set https_proxy http://10.138.15.10:8080

RUN mkdir -p /app/dist
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a tmp/node_modules/ /app/node_modules/

RUN npm install --global nodemon

RUN echo "cd /app; nodemon --ignore dist/ -L --exec npm run dev" > /usr/local/bin/npm_install_at_start.sh
ENTRYPOINT bin/bash /usr/local/bin/npm_install_at_start.sh