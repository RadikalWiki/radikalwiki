FROM node:12.20.2

WORKDIR /usr/src/app

RUN yarn install

COPY . .

#RUN yarn run build

CMD ["yarn", "run", "dev"]
