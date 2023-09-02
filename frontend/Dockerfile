# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /app/frontend

# Copie os arquivos de configuração e as dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos do frontend para o diretório de trabalho
COPY . .

# Exponha a porta 3000 (ou a porta que você deseja usar para o servidor de desenvolvimento)
EXPOSE 3000

# Inicie o servidor de desenvolvimento
CMD ["npm", "start"]