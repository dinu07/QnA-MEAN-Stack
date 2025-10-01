# base image
FROM node:8.11-alpine

# set working directory
RUN mkdir -p /var/www/qna
WORKDIR /var/www/qna

# add app
COPY . /var/www/qna

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/qna/node_modules/.bin:$PATH

# provide execute permission on the script
RUN chmod +x /var/www/qna/scripts/docker/*.sh

# start app
ENTRYPOINT ["/var/www/qna/scripts/docker/entry.sh"]


EXPOSE 8080
