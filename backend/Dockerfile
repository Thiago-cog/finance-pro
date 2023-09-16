# Use a imagem base do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do container
WORKDIR /app/backend

# Copie o arquivo `package.json` e `package-lock.json`
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte do backend para o diretório de trabalho
COPY . .

# Exponha a porta em que o servidor Node.js está ouvindo (substitua pela porta real)
EXPOSE 3001

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]