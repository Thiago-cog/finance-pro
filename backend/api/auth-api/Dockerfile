FROM node:latest

WORKDIR /app/backend

RUN npm install pm2 -g

COPY ./api/auth-api ./api/auth-api
RUN cd api/auth-api && npm install

COPY ../../component/user-authorization ../../component/user-authorization
RUN cd component/user-authorization && npm install

WORKDIR /app/backend/api/auth-api

EXPOSE 3000

CMD ["pm2 start", "app.js"]