FROM node:lts

WORKDIR /usr/src/ws

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

WORKDIR /usr/src/ws
EXPOSE 3000

CMD yarn serve