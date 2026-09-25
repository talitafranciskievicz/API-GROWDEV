import express from "express";
import * as dotenv from "dotenv";
import { growdevers } from "./dados.js";
import { randomUUID } from "crypto";
import { log } from "console";
import {
  logMiddleware,
  logRequestMiddleware,
  ValidateGrowdeverMiddleware,
} from "./middlewares.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rota - GET - Listar Growdevers
app.get("/growdevers", (req, res) => {
  const { idade, nome, email, email_includes } = req.query;

  let dados = growdevers;
  if (idade) {
    dados = dados.filter((item) => item.idade >= Number(idade));
  }

  if (nome) {
    dados = dados.filter((item) => item.nome.includes(nome));
  }

  if (email) {
    dados = dados.filter((item) => item.email === email);
  }

  if (email_includes) {
    dados = dados.filter((item) => item.email.includes(email_includes));
  }

  res.status(200).send({
    ok: true,
    mensagem: "Growdevers listados com sucesso",
    dados,
  });
});

// Rota POST - Criar um Growdever
app.post("/growdevers", [ValidateGrowdeverMiddleware], (req, res) => {
  try {
    // 1 - entrada
    const body = req.body;

    const novoGrowdever = {
      id: randomUUID(),
      nome: body.nome,
      email: body.email,
      idade: body.idade,
      matriculado: body.matriculado,
    };
    // 2 - processamento
    growdevers.push(novoGrowdever);
    // 3 - saída
    res.status(201).send({
      ok: true,
      mensagem: "Growdever criado com sucesso!",
      dados: growdevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

// GET /growdevers/:id - Obter um growdever pelo seu ID.

app.get("/growdevers/:id", [logRequestMiddleware], (req, res) => {
  try {
    // 1 - entrada
    const { id } = req.params;
    // 2 - processamento
    const growdever = growdevers.find((item) => item.id === id);
    if (!growdever) {
      // quando tem uma resposta sendo enviada no meio da rota, precisa usar o return para evitar um comportamento indesejado.
      return res.status(404).send({
        ok: false,
        mensagem: "Growdever não encontrado",
      });
    }
    // 3 - saída
    res.status(200).send({
      ok: true,
      mensagem: "Growdever obtido com sucesso",
      dados: growdever,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

// Rota PUT /growdevers/:id - Atualizar um Growdever especifíco

app.put("/growdevers/:id", [ValidateGrowdeverMiddleware], (req, res) => {
  try {
    // 1 entrada
    const { id } = req.params;
    const { nome, email, idade, matriculado } = req.body;

    // 2 processamento
    const growdever = growdevers.find((item) => item.id === id);

    if (!growdever) {
      return res.status(404).send({
        ok: false,
        mensagem: "Growdever não encontrado",
      });
    }

    growdever.nome = nome;
    growdever.email = email;
    growdever.idade = idade;
    growdever.matriculado = matriculado;

    // 3 saída

    res.status(200).send({
      ok: true,
      mensagem: "Growdever atualizado com sucesso",
      dados: growdevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

// Rota PATCH/growdevers/:id - Atualiza somente a matricula do Growdever

app.patch("/growdevers/:id", (req, res) => {
  try {
    // 1 entrada
    const { id } = req.params;
    // 2 processamento
    const growdever = growdevers.find((item) => item.id === id);
    if (!growdever) {
      return res.status(404).send({
        ok: false,
        mensagem: "Growdever não encontrado",
      });
    }

    growdever.matriculado = !growdever.matriculado;
    // 3 saída
    res.status(200).send({
      ok: true,
      mensagem: "Growdever atualizado (matricula) com sucesso",
      dados: growdevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

// Rota Delete - Faz a exclusão de um Growdever
app.delete("/growdevers/:id", (req, res) => {
  try {
    // 1 entrada
    const { id } = req.params;
    // 2 processamento
    const growdeverIndex = growdevers.findIndex((item) => item.id === id);
    if (growdeverIndex < 0) {
      return res.status(404).send({
        ok: false,
        mensagem: "Growdever não foi encontrado",
      });
    }

    growdevers.splice(growdeverIndex, 1);
    // 3 saída
    res.status(200).send({
      ok: true,
      mensagem: "Growdever excluído com sucesso",
      dados: growdevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

const porta = process.env.PORT;
app.listen(porta, () => {
  console.log("O servidor está rodando na porta " + porta);
});

const id = randomUUID();
console.log(id);
