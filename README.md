# Nodejs + Express

## Repositório para projeto da matéria de Sistemas Seguros Web, utilizando nodejs, express.

### Objetivo do projeto
Desenvolver uma API segura para um sistema de controle de usuários.

Persistência de dados com arquivo.json local, apenas para estudo e protótipo, pois não é seguro e performático salvar, ler e re-escrever dados em um único arquivo.json direto no backend  

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

### Documentações utilizadas
[RFC 6750](https://www.rfc-editor.org/info/rfc6750/#section-3.1)