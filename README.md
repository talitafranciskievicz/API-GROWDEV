# 🚀 API Growdev

API REST desenvolvida com **Node.js e Express** para o gerenciamento de Growdevers, permitindo cadastrar, consultar, atualizar e excluir registros.

O projeto foi desenvolvido com o objetivo de praticar a criação de APIs REST, o gerenciamento de rotas HTTP e a manipulação de dados.

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* JavaScript
* Postman (para testes das rotas)

## 📋 Funcionalidades

* Listar todos os Growdevers.
* Filtrar Growdevers por idade.
* Cadastrar um novo Growdever.
* Buscar um Growdever pelo ID.
* Atualizar os dados de um Growdever.
* Atualizar a matrícula de um Growdever.
* Excluir um Growdever.

## ⚙️ Como executar o projeto

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/talitafranciskievicz/API-GROWDEV.git
```

2. Acesse a pasta do projeto:

```bash
cd API--GROWDEV
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor:

```bash
npm run dev
```

> **Observação:** O comando `npm run dev` depende de estar configurado no `package.json`. Caso não esteja, utilize o comando correspondente à configuração do projeto.

Por padrão, os exemplos abaixo utilizam:

```text
http://localhost:3000
```

## 📌 Endpoints

| Método | Rota              | Descrição                         |
| ------ | ----------------- | --------------------------------- |
| GET    | `/growdevers`     | Lista todos os Growdevers         |
| POST   | `/growdevers`     | Cadastra um novo Growdever        |
| GET    | `/growdevers/:id` | Busca um Growdever pelo ID        |
| PUT    | `/growdevers/:id` | Atualiza os dados de um Growdever |
| PATCH  | `/growdevers/:id` | Atualiza a matrícula              |
| DELETE | `/growdevers/:id` | Exclui um Growdever               |

## 🔍 Exemplos de requisições

### 1. Listar Growdevers

```http
GET /growdevers
```

Retorna a lista de Growdevers cadastrados.

**Filtrar por idade:**

```http
GET /growdevers?idade=20
```

Retorna os Growdevers que correspondem à idade informada.

### 2. Criar um novo Growdever

```http
POST /growdevers
```

**Body (JSON):**

```json
{
  "nome": "Daniel",
  "email": "daniel@email.com",
  "idade": 27,
  "matriculado": true
}
```

**Campos:**

| Campo         | Tipo    | Obrigatório |
| ------------- | ------- | ----------- |
| `nome`        | String  | Sim         |
| `email`       | String  | Sim         |
| `idade`       | Number  | Sim         |
| `matriculado` | Boolean | Não         |

O campo `matriculado` indica se o Growdever está matriculado em uma turma da Growdev.

### 3. Buscar Growdever pelo ID

```http
GET /growdevers/:id
```

**Exemplo:**

```http
GET /growdevers/84584ae8-3ce3-4839-99d8-930a34ca3b85
```

Retorna os dados do Growdever correspondente ao ID informado.

### 4. Atualizar um Growdever

```http
PUT /growdevers/:id
```

**Body (JSON):**

```json
{
  "nome": "Daniel",
  "email": "daniel@gmail.com.br",
  "idade": 22,
  "matriculado": true
}
```

Atualiza os dados do Growdever identificado pelo ID.

### 5. Atualizar matrícula

```http
PATCH /growdevers/:id
```

Atualiza a matrícula de um Growdever específico.

> O formato do corpo da requisição deve ser confirmado conforme a implementação da API.

### 6. Excluir um Growdever

```http
DELETE /growdevers/:id
```

Exclui o Growdever correspondente ao ID informado.

## 🧪 Testes

As requisições podem ser testadas utilizando o [Postman](https://www.postman.com/).

📄 **Documentação completa:** [Acessar documentação da API no Postman](https://documenter.getpostman.com/view/56936131/2sBYB4JmAa)

