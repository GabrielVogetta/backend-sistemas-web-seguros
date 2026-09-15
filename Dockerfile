# Especifica a versão do Node para aplicação
FROM node:24

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o arquivo de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expoe a porta 8080 para rodar aplicação
EXPOSE 8080

# Roda aplicação com expressjs
CMD ["node", "index.js"]

# Como buildar e rodar?
## Para buildar e gerar imagem
   ### docker build -t my-nodejs-app .
## Para rodar
   ### docker run -it --rm -p 8080:8080 --name my-running-app my-nodejs-app 