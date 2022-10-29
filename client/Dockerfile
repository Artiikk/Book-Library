FROM node:16-alpine3.12

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'client' folder the current working directory
WORKDIR /client

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json yarn.lock /client/

# install project dependencies
RUN yarn

# copy project files and folders to the current working directory (i.e. 'client' folder)
COPY . /client/

# build client for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "http-server", "dist" ]
