# Use a imagem base do Node.js para o ambiente de construção
FROM node:14 as build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo `package.json` e `package-lock.json` (ou `yarn.lock`, se estiver usando o Yarn)
COPY frontend/package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos do frontend para o diretório de trabalho
COPY frontend/ ./

# Construa a aplicação React
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copie os arquivos de compilação do React para o servidor web do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80 para fora do container
EXPOSE 3001

# O Nginx é iniciado automaticamente quando o container é iniciado
CMD ["nginx", "-g", "daemon off;"]