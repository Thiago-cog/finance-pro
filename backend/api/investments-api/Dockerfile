FROM node:20

WORKDIR /app/backend/api/investments-api

COPY ./ ./

COPY .env.example .env

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]