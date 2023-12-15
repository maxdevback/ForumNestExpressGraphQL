FROM node:21-alpine3.18

WORKDIR /app

COPY . /app

RUN npm ci
RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]