# Projeto de Login com Node.js 

### Instalação do projeto
Clone Repositório
```sh
git clone https://github.com/Thiago-cog/login-node.git
```
```sh
cd login-node
```

Crie o Arquivo .env
```sh
cp .env.example .env
```
Gere uma secret para seu projeto
```sh
openssl rand -hex 64
```
Agora atualize o valor da variavel AUTH_SECRET do arquivo .env
```dosini
AUTH_SECRET=SUA_CHAVE
```

Suba os containers do projeto
```sh
docker-compose up -d
```

Após subir o container do postgres executar o script do banco de dados
```sh
DDL.sql
```

Execute o comando para subir o projeto
```sh
npm run dev
```

Link do app
[http://localhost:3000](http://localhost:3000)
