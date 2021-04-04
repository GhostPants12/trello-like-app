FROM node:12.13-alpine As development

RUN apk add --no-cache gcc curl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g rimraf @nestjs/cli

RUN apk add --no-cache make gcc g++ python && \
  npm install --only=development && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

COPY . .


RUN npm install && \
  npm run build:docker

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python && \
  npm install --only=production && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]