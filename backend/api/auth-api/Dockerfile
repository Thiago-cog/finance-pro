FROM node:latest

WORKDIR /app/backend

COPY ./ ./
RUN npm install

WORKDIR /app/backend/api/auth-api

EXPOSE 3001

CMD ["npm", "start"]