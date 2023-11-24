FROM node:20

WORKDIR /app/backend/api/accounts-api

COPY ./ ./

COPY .env.example .env

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]