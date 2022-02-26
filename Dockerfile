## https://hub.docker.com/layers/node/library/node/16.14.0-alpine/images/sha256-425c81a04546a543da824e67c91d4a603af16fbc3d875ee2f276acf8ec2b1577?context=explore
FROM node:16.14.0-alpine

ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}

RUN npm install && npm cache clean --force

WORKDIR ${HOME}
