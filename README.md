# Todo List Api

![projeto](https://user-images.githubusercontent.com/69723773/221297427-1e833837-6fbf-4cfd-adb2-2e7b228ef533.gif)

## CONFIGURAÇÃO NO FRONTEND

 - Navegue pelo terminal da pasta raiz do projeto para a pasta frontend
 - Digite `npm install` para instalar as dependências do projeto
 - Digite `npm run dev` para iniciar o projeto
 - Por padrão, o projeto será executado na porta 3000
 
 ## CONFIGURAÇÃO NO BACKEND
 
 - Navegue pelo terminal da pasta raiz do projeto para a pasta backend/app
 - Digite `npm install` para instalar as dependências do projeto
 - Digite `npm run dev` para iniciar o projeto localmente
 - Por padrão, o projeto será executado na porta 3001
 
## Iniciando o projeto com Docker 🐳
 
  - Navegue pelo terminal da pasta raiz do projeto para a pasta backend/app
  - Digite o comando `npm run compose:up:dev`
  - O comando acima iniciara o arquivo docker compose que se encontra na raiz do projeto, e ira subir
  a aplicação frontend, backend, e o banco de dados ja executando a migração das tabelas.
  - Por padrão o frontend esta executando na porta 3000, o backend na porta 3001 e o banco de dados na porta 3306
  - Para excluir os containers criados so executar o comando `npm run compose:down:dev`
  
⚠️**Atenção:**
  - Na pasta Backend/app no aquivo .env.exemple mudar o nome para .env
  - No arquivo vai ter 2 variáveis de ambiente do banco de dados para executar localmente ou pelo docker,
  não esqueça de colocar o username e o password do seu banco de dados na variável, em sequida basta mudar 
  no arquivo backend/prisma/schema.prisma a variável.
