# Finance Pro ![version](https://img.shields.io/badge/version-0.1-blue)

## Por que a criação do projeto?

O projeto foi desenvolvido para compôr a avaliação das disciplinas de Labotarório de Desenvolvimento de Aplicativos Híbridos, Planos de Negócios e Arquitetura e Projetos de Software.

A plataforma Finance Pro foi desenvolvida com intuito de auxíliar pessoas fisicas ou juridicas em suas finanças. Esse é um MVP do projeto, ainda não contém muitas funcionalidades.
As técnologia que usei foram estas listadas abaixo:

### Tecnologias utilizadas.
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

#### BackEnd
- Node Js foi utilizado para fazer o backend, feito todo em Javascript, usando express como roteamento.
- PostgreSQL foi o banco relacional uitilizado nesse projeto, OBS: O banco é um só, não consegui ter tempo para separa os bancos.
- Jest foi a tecnologia utilizada para fazer os testes unitários.
#### FrontEnd
- Vite Js foi utilizado para a execução do frontend e a configuração do mesmo.
- ReactJs foi utilizado para criação de telas no frontend.
- Tailwind CSS foi a tecnologia utilizada para fazer a estilização do front.
#### Infraestrutura
- Docker e Docker Compose foram as tecnologias utilizadas para organizar os microserviços e o projeto do frontend.
- AWS foi a plataforma de deploy utilizada para colocar o projeto no ar.
- Git foi a tecnologia usada para o controle de versão do projeto.
- Git Hub Actions foi utilizado para fazer o CI/CD.

### Arquitetura.

#### Arquitetura em Microserviços

Microserviços: 
- auth
- accounts

### Padrão de Projeto.
#### Padrão de Projeto Repository

### TDD.
#### auth-api
![image](https://github.com/Thiago-cog/finance-pro/assets/65147035/295bf6bf-9130-4b71-a15f-3979a8e1fb21)
#### accounts-api
![image](https://github.com/Thiago-cog/finance-pro/assets/65147035/768db2a0-f634-4d43-83f9-dfd1f900e972)



### APIs.

Toda documentação das APIs está disponível nas seguintes rotas após a incialização do projeto:
- Auth - ```http://localhost:3001/auth-api-docs```
- Accounts - ```http://localhost:3002/accounts-api-docs```

### Modelagem do banco de dados.
![image](https://github.com/Thiago-cog/finance-pro/assets/65147035/7bc5aabb-a197-4aea-b4e4-e2891cb10019)

## Componente da realização do projeto.

- Thiago de Oliveira Santos - 202022059

## Instale na sua máquina.

Clone o repositório:
```sh
git clone https://github.com/Thiago-cog/finance-pro.git
```
Entre na pasta do projeto
```sh
cd finance-pro
```
Configure os .env do projeto e após isso inicialize o projeto utlizando o Docker Compose
```sh
sudo docker-compose up --build
```
