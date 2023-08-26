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

### Rotas
#### Login
#### Metodo POST
[http://localhost:3000/auth/sing-in](http://localhost:3000/auth/sing-in)  
#### Exemplo
```json
{
  "email": "adm@gmail.com",
  "password": "12345678"
}
```
#### Logout
#### Metodo DELETE
[http://localhost:3000/auth/sing-out](http://localhost:3000/auth/sing-out)  
OBS usar o token gerado no login

#### Users
#### Metodo GET
[http://localhost:3000/users](http://localhost:3000/users)  
OBS usar o token gerado no login

#### Create User
#### Metodo POST
[http://localhost:3000/users/create](http://localhost:3000/users/create)  
OBS usar o token gerado no login 
senha de 8 digitos 
#### Exemplo
```json
{
  "email": "exemplo@exemplo.com",
  "password": "12345678",
  "fullname": "Exemplo"
}
```
