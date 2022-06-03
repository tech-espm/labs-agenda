FROM node:14.17.0-alpine3.11 AS base

WORKDIR /usr/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

COPY . .

RUN npm install --production --silent

ENTRYPOINT ["npm", "/app"]
