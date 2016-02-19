FROM node:argon

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 3000

ARG NODE_ENV=production

RUN NODE_ENV=${NODE_ENV} ./node_modules/.bin/webpack -p

CMD NODE_ENV=production ./node_modules/.bin/serve build

