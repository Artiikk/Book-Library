FROM node:16-alpine3.12

WORKDIR /server

COPY package*.json yarn.lock /server/
RUN yarn install

COPY . /server/

EXPOSE 8081
CMD [ "yarn", "start"]