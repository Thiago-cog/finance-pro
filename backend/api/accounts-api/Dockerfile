FROM node:latest

WORKDIR /app/backend

COPY ./ ./
RUN npm install

WORKDIR /app/backend/api/accounts-api

EXPOSE 3000

CMD ["npm", "start"]