FROM node:latest

WORKDIR /app/backend

COPY ./ ./
RUN npm install

WORKDIR /app/backend/api/accounts-api

EXPOSE 3002

CMD ["npm", "start"]