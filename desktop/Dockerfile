FROM node:lts

ARG NODE_ENV
ARG REACT_APP_HOST_ADDRESS

ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_HOST_ADDRESS=$REACT_APP_HOST_ADDRESS

WORKDIR /usr/src/desktop

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

WORKDIR /usr/src/desktop/build
RUN yarn global add serve
EXPOSE 4000

CMD serve -p 4000 -s .