# Nodejs + Express

## Repositório para projeto da matéria de Sistemas Seguros Web, utilizando nodejs, express.

### Objetivo do projeto
Desenvolver uma API segura para um sistema de controle de usuários.

Persistência de dados com arquivo.json local, apenas para estudo e protótipo, pois não é seguro e performático salvar, ler e re-escrever dados em um único arquivo.json direto no backend  

### Endpoints e Métodos
POST /login
GET /users
POST /users
PUT /users/{id}
DELETE /users/{id}
GET /profile

### Arquitura de pastas utilizada
[Layered Architecture](https://medium.com/@ankitpartap24/layered-architecture-in-node-js-5ef94e846ec4)

### Status HTTP utilizados
201
400


### LIBs utilizadas
[Bcrypt](https://www.npmjs.com/package/bcrypt)
    [Repositório](https://github.com/kelektiv/node.bcrypt.js)
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    [Repositório](https://github.com/auth0/node-jsonwebtoken)
[cors](https://www.npmjs.com/package/cors)
    [Repositório](https://github.com/expressjs/cors)

### Documentações utilizadas
[RFC 6750](https://www.rfc-editor.org/info/rfc6750/#section-3.1)
[Using middleware | ExpressJs](https://expressjs.com/en/5x/guide/using-middleware/)

### Oportunidades no projeto
#### Projeto despadronizado
Em algumas funções é realizada as "validações negativas" antes e em outra funções não.
Essa despadronização dificulta escalabilidade e resolução de bugs
#### Definição mais complexa de papéis
- Somente admin pode realizar cadastro: Em uma aplicação que será utilizada internamente em uma empresa, pode ser possível, mas ao realizar o primeiro login, o usuário deverá redefinir sua senha
- Somente admin pode realizar a alteração de role
- Deverá sempre haver pelo menos 1 admin
- Usuário e operador também podem realizar alteração de seu perfil, mas somente admin pode alterar a role 
- Configurar roles de forma dinâmica