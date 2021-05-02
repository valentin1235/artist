FROM node:15

MAINTAINER Heechul Yoon <valentin123@naver.com>

COPY package*.json ./

# update npm to the latest version
RUN npm install -g npm@latest

# install module dependancies by npm
RUN npm install

COPY . .

# open the port for the application
EXPOSE 3000

# run the server with environmental variables
CMD ./node_modules/.bin/babel-node ./src/bin/server.js
