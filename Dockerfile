FROM node:16

COPY ./package.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "start" ]