# Finance Pro ![version](https://img.shields.io/badge/version-0.1-blue)

## Por que a criação do projeto?

O projeto foi desenvolvido para compôr a avaliação das disciplinas de Labotarório de Desenvolvimento de Aplicativos Híbridos, Planos de Negócios e Arquitetura e Projetos de Software.

A plataforma Finance Pro foi desenvolvida com intuito de auxíliar pessoas fisicas ou juridicas em suas finanças. Esse é um MVP do projeto, ainda não contém muitas funcionalidades.
As técnologia que usei foram estas listadas abaixo:

### Tecnologias utilizadas.
![Static Badge](https://img.shields.io/badge/NODE.JS-68A063?style=for-the-badge&logo=nodedotjs&logoColor=%2368A063&labelColor=black)
![Static Badge](https://img.shields.io/badge/POSTGRESQL-316192?style=for-the-badge&logo=postgresql&logoColor=%23316192&labelColor=black)
![Static Badge](https://img.shields.io/badge/JEST-C21325?style=for-the-badge&logo=jest&logoColor=%23C21325&labelColor=black)
![Static Badge](https://img.shields.io/badge/VITE%20JS-BD34FE?style=for-the-badge&logo=vite&logoColor=%23FFC51D&labelColor=black)
![Static Badge](https://img.shields.io/badge/REACT-61DBFB?style=for-the-badge&logo=react&logoColor=%2361DBFB&labelColor=black)
![Static Badge](https://img.shields.io/badge/TAILWIND%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=%2338BDF8&labelColor=black)
![Static Badge](https://img.shields.io/badge/DOCKER-0DB7ED?style=for-the-badge&logo=docker&logoColor=%230DB7ED&labelColor=black)
![Static Badge](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=%23FF9900&labelColor=black)
![Static Badge](https://img.shields.io/badge/GIT-F05033?style=for-the-badge&logo=git&logoColor=%23F05033&labelColor=black)

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

### Arquitetura.

#### Arquitetura em Microserviços

Microserviços: 
- auth
- accounts

### Padrão de Projeto.
#### Padrão de Projeto Repository

### TDD.

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
