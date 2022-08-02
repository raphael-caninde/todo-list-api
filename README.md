# Todo List Api

# CONFIGURAÇÃO NO FRONTEND

 - Navegue pelo terminal da pasta raiz do projeto para a pasta frontend
 - Digite npm install para instalar as dependências do projeto
 - Digite npm start para iniciar o projeto
 - Por padrão, o projeto será executado na porta 3000
 
 # CONFIGURAÇÃO NO BACKEND
 
 - Navegue pelo terminal da pasta raiz do projeto para a pasta backend/app
 - Digite npm install para instalar as dependências do projeto
 - Digite npm run dev para iniciar o projeto localmente
 - Por padrão, o projeto será executado na porta 3001
 
# Iniciando o projeto no Docker
 
  - Navegue pelo terminal da pasta raiz do projeto para a pasta backend/app
  - Digite o comando npm run compose:up:dev
  - O comando acima iniciara o arquivo docker compose que se encontra na raiz do projeto, e ira subir
  a aplicação frontend, backend, e o banco de dados ja executando a migração das tabelas.
  - Por padrão o frontend esta executando na porta 3000, o backend na porta 3001 e o banco de dados na porta 3306
  
 #⚠️**Atenção:**
  - Na pasta Backend/app no aquivo .env.exemple mudar o nome para .env
  - No arquivo vai ter 2 variaveis de ambiente do banco de dados para executar localmente ou pelo docker
  - Basta mudar no arquivo backend/prisma/schema.prisma a viriavel.
