FROM node:21-alpine3.18

WORKDIR /app

COPY . .

RUN npm ci
RUN npm i nest -g

EXPOSE 4000

CMD ["npm", "start"]
