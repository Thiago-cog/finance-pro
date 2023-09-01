# Use a imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo `package.json` e `package-lock.json`
COPY backend/package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte do backend para o diretório de trabalho
COPY backend/ ./

# Exponha a porta em que o servidor Node.js está ouvindo (substitua pela porta real)
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["node", "app.js"]