FROM node:21-alpine3.18 AS build

WORKDIR /app

COPY . /app
RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build/ /usr/share/nginx/html