FROM nginx:1.11-alpine
MAINTAINER mastersprintr@gmail.com

COPY . /conf
# COPY frontend/dist /var/www/html

ENTRYPOINT nginx -c /conf/rain-cloud.conf