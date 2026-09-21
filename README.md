# Repositório para projeto da matéria de Sistemas Seguros Web - Téc. em Análise e Desenvolvimento de Sistemas

### 1. Objetivo do projeto
Desenvolver uma API REST segura para um sistema de controle de usuários, utilizando Tokens JWT e implementando Role-Based Acess Control (RBAC).

### 2. Métodos, Endpoints e Status
#### Métodos e Endpoints
- **POST /login**\
  Descrição: autenticação por email e senha, obtenção do token jwt\
  Acesso: público

- **GET /profile**\
  Descrição: listar dados do próprio usuário
  Acesso: bearer token\
  Role: todas

- **GET /users**\
  Descrição: listar usuários\
  Acesso: bearer token\
  Role: admin e operator

- **POST /users**\
  Descrição: criar usuário\
  Acesso: bearer token\
  Role: admin

- **PUT /users/{id}**\
  Descrição: alterar usuário\
  Acesso: bearer token\
  Role: admin e operator

- **DELETE /users/{id}**\
  Descrição: deletar usuário
  Acesso: bearer toke\
  Role: admin

#### Status HTTP retornados
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

### 3. Arquitetura e Fluxo
#### Arquitetura  
  Baseada em Layered Architecture, separando responsabilidades no controle das rotas e métodos, requisições, verificação e manipulação da base de dados
  
  _Routes_: define rotas\
  _Middlewares_: realiza verificação do jwt token e de roles\
  _Controllers_: valida requisições http e envia respostas\
  _Services_: define regras de negócio, manipula a base de dados, gera hash de senha e jwt    

#### Fluxo
  1. Cliente envia requisição com o Bearer Token
  2. Middleware jwtAuth valida assinatura do token e devolve payload no atributo req.user
  3. Middleware requireAdmim... verifica role do usuário
  3. Controller valida body da requisição e verifica respostas do Service
  4. Service verifica e manipula base de dados

### 4. Planejamento futuro

#### Já realizado
- Permitir que somente o admin possa alterar role de usuários
- Não listar senhas de usuários

#### Problemas identificados
- Sem validação de email
- Admin pode excluir ou alterar a si mesmo
- Necessário maior segurança do JWT_SECRET
- Definir origens no cors
- Definir rate limit
- Implementar refresh tokens
- Padronização do código projeto
  Exemplo: Em algumas funções é realizada as "validações negativas" antes e em outra funções não. Essa despadronização pode dificultar escalabilidade e resolução de bugs
- Persistência do dados
- Somente admin pode realizar cadastro: Em uma aplicação que será utilizada internamente em uma empresa, pode ser possível, mas ao realizar o primeiro login, o usuário deverá redefinir sua senha
- Configurar roles de forma dinâmica
- Controle de acesso a rotas inexistentes
- Usuário e operador também podem realizar alteração de seu perfil, mas somente admin pode alterar a role 

### 5. Como rodar localmente
[Instalar Node.js](https://nodejs.org/en/download)

`git clone https://github.com/GabrielVogetta/backend-sistemas-web-seguros.git`   
`cd backend-sistemas-web-seguros`  
`npm install`
`echo "PORT=3000" >> .env`
`echo "JWT_SECRET=<secret>" >> .env`
`node index.js`

### 6. Referências
#### Artigos
[Layered Architecture](https://medium.com/@ankitpartap24/layered-architecture-in-node-js-5ef94e846ec4)

#### Dependências

[nodejs](https://nodejs.org/pt-br) | [repositório](https://github.com/nodejs/node)\
[express js](https://expressjs.com/) | [repositório](https://github.com/expressjs/express)\
[bcrypt](https://www.npmjs.com/package/bcrypt) | [repositório](https://github.com/kelektiv/node.bcrypt.js)\
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | [repositório](https://github.com/auth0/node-jsonwebtoken)\
[cors](https://www.npmjs.com/package/cors) | [repositório](https://github.com/expressjs/cors)\
[dotenv](https://www.npmjs.com/package/dotenv) | [repositório](https://github.com/motdotla/dotenv)

#### Documentações
Como usar middlewares em expressjs [Using middleware | ExpressJs](https://expressjs.com/en/5x/guide/using-middleware/)\
Como formatar README.md [Markdown | Github](https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#line-breaks)\
Como receber e tratar Bearer Tokens | [RFC 6750](https://www.rfc-editor.org/info/rfc6750/#section-3.1)