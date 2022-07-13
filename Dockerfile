FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN yarn install 

COPY . /usr/src/app

RUN yarn build

EXPOSE 3030

CMD [ "yarn", "start" ]