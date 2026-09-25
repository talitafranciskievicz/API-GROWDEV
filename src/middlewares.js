export const logMiddleware = (req, res, next) => {
  console.log("Hello Middleware!!");

  next();
};
export const logRequestMiddleware = (req, res, next) => {
  console.log(req.query);
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.body);

  next();
};

// Validar os campos obrigatórios de um Growdever
export const ValidateGrowdeverMiddleware = (req, res, next) => {
  try {
    const body = req.body;

    if (!body.nome) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo nome não foi informado.",
      });
    }
    if (!body.email) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo e-mail não foi informado.",
      });
    }

    if (!body.idade) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo idade não foi informado.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
};
// antes: Request ---> Cai na rota da API
// agora: Request ---> Middleware ---> Rota API
