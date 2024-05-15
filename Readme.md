# Desafio Dio - **Criando a API do Dio Bank Com Node**( Typescript)



Criar uma API REST com Node.js:

1. Crie um novo projeto Node.js usando o comando `npm init`.
2. Instale as dependências necessárias usando o comando `npm install express body-parser mongoose cors`.
3. Crie um arquivo chamado `server.js` e adicione o seguinte código:



```plaintext
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Define the port that the server will listen on.
const port = 3000;

// Create a new Express app.
const app = express();

// Configure body parser to parse the request body as JSON.
app.use(bodyParser.json());

// Enable CORS to allow requests from any origin.
app.use(cors());

// Connect to the database.
mongoose.connect("mongodb://localhost:27017/mydatabase");

// Create a new route for the `/users` endpoint.
app.get("/users", (req, res) => {
  // Get all of the users from the database.
  const users = mongoose.model("User").find({}).toArray();

  // Send the users back to the client.
  res.send(users);
});

// Create a new route for the `/users/:id` endpoint.
app.get("/users/:id", (req, res) => {
  // Get the user with the specified ID from the database.
  const user = mongoose.model("User").findOne({ id: req.params.id });

  // Send the user back to the client.
  res.send(user);
});

// Create a new route for the `/users` endpoint.
app.post("/users", (req, res) => {
  // Create a new user from the request body.
  const user = new mongoose.model("User", req.body);

  // Save the user to the database.
  user.save();

  // Send the user back to the client.
  res.send(user);
});

// Create a new route for the `/users/:id` endpoint.
app.put("/users/:id", (req, res) => {
  // Update the user with the specified ID from the database.
  const user = mongoose.model("User").findOne({ id: req.params.id });

  // Update the user's data with the data from the request body.
  user.name = req.body.name;
  user.email = req.body.email;

  // Save the user to the database.
  user.save();

  // Send the user back to the client.
  res.send(user);
});

// Create a new route for the `/users/:id` endpoint.
app.delete("/users/:id", (req, res) => {
  // Delete the user with the specified ID from the database.
  const user = mongoose.model("User").findOne({ id: req.params.id });

  // Delete the user.
  user.remove();

  // Send a 200 OK response to the client.
  res.sendStatus(200);
});

// Start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

1. Execute o comando `npm start` para iniciar o servidor.
2. Abra seu navegador e acesse o endereço `http://localhost:3000/users` para ver a lista de usuários.
3. Você pode usar o Postman ou outra ferramenta de teste de API para testar as outras rotas.



Projeto abrangente e completo para construir uma 'App ' (API) simples de banco com Typescript:

## Pré-requisitos

Para este projeto, você precisará dos seguintes pré-requisitos:

- NodeJS 12 ou superior
- NPM 6 ou superior
- Typescript 3 ou superior
- Express 4 ou superior
- SQLite 3 ou superior



## Criar o projeto

Primeiro, crie um novo diretório para o projeto e inicialize um projeto NodeJS nele:

bash

```bash
mkdir my-bank-app && cd my-bank-app
npm init
```

Agora, adicione as seguintes dependências ao seu projeto:

bash

```bash
npm install express sqlite3 typescript @types/express @types/sqlite3
```



## Criar o banco de dados

Agora, vamos criar o banco de dados. Para isso, crie um novo arquivo chamado `bank.db` no diretório raiz do seu projeto. Em seguida, abra o arquivo em um editor de texto e adicione o seguinte código SQL:

sql

```sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  balance NUMERIC
);
```



## Criar a aplicação

Agora, vamos criar a aplicação. Para isso, crie um novo arquivo chamado `app.ts` no diretório raiz do seu projeto. Em seguida, abra o arquivo em um editor de texto e adicione o seguinte código:

typescript

```typescript
import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('bank.db');

app.get('/accounts', (req, res) => {
  db.all('SELECT * FROM accounts', (err, rows) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.send(rows);
    }
  });
});

app.post('/accounts', (req, res) => {
  const { name, balance } = req.body;

  db.run('INSERT INTO accounts (name, balance) VALUES (?, ?)', [name, balance], (err) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.status(201).send('Account created');
    }
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
```

Este código cria uma API RESTful que permite criar e listar contas bancárias. Para testar a API, abra o seu navegador e navegue até `http://localhost:3000/accounts`. Você deve ver uma lista de todas as contas bancárias no banco de dados.



## Testar a aplicação

Agora, você pode testar a aplicação usando o seguinte comando:

bash



```bash
npm test
```

Este comando irá executar os testes unitários da aplicação e verificar se ela está funcionando corretamente.



## Conclusão

Este é apenas um exemplo de um projeto de app bancária simples em Typescript. Você pode adicionar mais funcionalidades à aplicação, como a capacidade de depositar e sacar dinheiro, transferir dinheiro entre contas, e assim por diante.





## Desafios

##### [ ] Implementar os métodos de depósito (deposit) e saque (withdraw) na classe DioAccount

- Os valores dos saldos devem ser alterados, de acordo com o valor informado para depósito

- Apenas contas com o status true e saldo (balance) maior que o valor solicitado podem fazer saques

  

##### [ ] Implementar o método de empréstimo (getLoan) na classe CompanyAccount

- Os valores do saldos deve ser acrescidos, de acordo com o valor informado para empréstimo

- Apenas contas com o status true podem fazer empréstimo

  

**[ ] Criar um novo tipo de conta a partir da DioAccount**

- ##### Esta conta não deve receber novos atributos

- Esta conta terá um método de depósito, que acresce 10 a mais ao valor informado para depósito. (Ex: Um depósito de 100, será de 110 no final)

  

##### [ ] Todos os atributos de qualquer conta devem ser privados

##### [ ] Os atributos name e accountNumber não podem ser alterados internamente ou externamente

**[ ] Criar instancias para cada um dos tipos de conta no app.ts e executar os métodos possíveis.**

##### 

## Snowpack Scripts

### npm start

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!
