FROM node:20

WORKDIR /app/

COPY package.json ./
COPY yarn.lock ./
COPY . /app/

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
