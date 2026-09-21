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
- 403 Forbidden
- 404 Not Found

### 3. Arquitetura e Fluxo
#### Arquitetura  
  Baseada em Layered Architecture, separando responsabilidades no controle das rotas e métodos, requisições, verificação e manipulação da base de dados
  
  _Routes_: define rotas\
  _Middlewares_: realiza verificação do jwt token e de roles\
  _Controllers_: valida requisições http e envia respostas\
  _Services_: define regras de negócio, manipula a base de dados, gera hash de senha e jwt
  _Dados_: salvos em memória (array com usuários e service.js), para exemplo    

#### Fluxo
  1. Cliente envia requisição com o Bearer Token no header authorization
  2. Middleware jwtAuth valida assinatura do token e devolve payload no atributo req.user {id, role}\
  Tempo de expiração de 30 min hora: estou considerando por exemplo que a aplicação seria para um e-commerce, para experiência do cliente 30 min em média são sufientes para procurar e realizar uma compra. Implementaria aqui também refresh tokens de 7 dias, para que o usuário possa voltar depois de poucos dias e não precise logar novamente.
  3. Middleware requireAdmim... verifica role do usuário
  3. Controller valida body da requisição e verifica respostas do Service
  4. Service verifica e manipula base de dados

### 4. Análise de segurança

#### Problemas já resolvidos
- Permitir que somente o admin possa alterar role de usuários
- Não listar senhas de usuários
- Não permitir inclusão ou atualização de roles não existentes (diferentes de admin, operator ou user)

#### Vulnerabilidades pendentes: solução
- Sem validação de email em POST /login: implementar validação de esquema do corpo da requisição.
- Admin pode excluir ou alterar a si mesmo (exemplo em test.js): implementar validação que não permita que um ID exclua a si mesmo, também garantir que sempre tenha um admin.
- Operator consegue alterar admin: implementar controle que permita que operator altere apenas usuário
- Rate limit não definido: implementar rate limit em middlewares, sobretudo em rotas públicas
- Despadronização do código do projeto
  Exemplo, em algumas funções é realizada as "validações negativas" antes e em outra funções não. Essa despadronização pode dificultar escalabilidade e resolução de bugs: garantir que as camadas do código realizem a validação de erros antes.
- .env visível: alguém que tem acesso aos arquivos do projeto poderá forjar credencias de admin ou outras roles, necessário ignorar no .gitignore e garantir que as configurações de ambiente estão estáveis

### 5. Front-end 
Não foi possível implementar front-end, porém no código test.js há exemplos de como é realizada essa comunicação, através da função fetch. 

### 6. OAuth 2.0
Nesse contexto, é possível expandir para que o usuário logue apenas usando google ou github. Provedor terceiro retornaria se a identidade é válida, e o sistema geraria um token jwt, mas sem necessidade de gerar hash e armazenar senha, o que seria mais performático, visto que o processo de encriptação e desencriptação de senhas exige processamento.

### 7. Como rodar localmente
[Instalar Node.js](https://nodejs.org/en/download)

`git clone https://github.com/GabrielVogetta/backend-sistemas-web-seguros.git`   
`cd backend-sistemas-web-seguros`  
`npm install`\
`node index.js`

#### Como testar
`node index.js`
Abrir novo terminal:
`node test.js`

Observação: sistema irá rodar na porta 3000 e gerar um jwt_secret genérico caso arquivo .env não seja configurado.

### 8. Referências
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