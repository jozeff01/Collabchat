# этап сборки
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# этап сервера
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Проксируем API-запросы /api → backend
COPY nginx.conf /etc/nginx/conf.d/default.conf
