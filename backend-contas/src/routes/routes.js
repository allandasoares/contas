const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/userController");
const controllerProfile = require("../controllers/profileController");
const controllerAccess = require("../controllers/accessController");
const controllerCategory = require("../controllers/categoryController");
const controllerTransation = require("../controllers/transationController");
const controllerBank = require("../controllers/bankController");
const jwt = require("jsonwebtoken");

//Verifica o token
function verifyJwt(req, res, next) {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(401).end();

    req.userId = user.userId;
    next();
  });
}

//================================USER================================//
//Create
router.post("/usuarios", async (req, res) => {
  const { nome, email, senha, perfil_id } = req.body;
  const response = await controllerUser.create({
    nome,
    email,
    senha,
    perfil_id,
  });
  res.status(response.code).json(response);
});

//Delete
router.delete("/usuarios/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerUser.delete(id);
  res.status(response.code).json(response);
});

//Index
router.get("/usuarios", verifyJwt, async (req, res) => {
  const response = await controllerUser.index();
  res.status(response.code).json(response);
});

//Show
router.get("/usuarios/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerUser.show(id);
  res.status(response.code).json(response);
});

//Update
router.put("/usuarios/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil_id } = req.body;
  const response = await controllerUser.update(id, {
    nome,
    email,
    senha,
    perfil_id,
  });
  res.status(response.code).json(response);
});

//Login
router.post("/auth", async (req, res) => {
  const { email, senha } = req.body;
  const response = await controllerUser.check({ email, senha });
  res.status(response.code).json(response);
});

router.post("/logout", verifyJwt, async (req, res) => {
  res.end();
});

//===============================PROFILE===============================//
//Create
router.post("/profiles", async (req, res) => {
  const { tipo, acessos_id } = req.body;
  const response = await controllerProfile.create({ tipo, acessos_id });
  res.status(response.code).json(response);
});

//Delete
router.delete("/profiles/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerProfile.delete(id);
  res.status(response.code).json(response);
});

//Index
router.get("/profiles", verifyJwt, async (req, res) => {
  const response = await controllerProfile.index();
  res.status(response.code).json(response);
});

//Show
router.get("/profiles/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerProfile.show(id);
  res.status(response.code).json(response);
});

//Update
router.put("/profiles/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { tipo, acessos_id } = req.body;
  const response = await controllerProfile.update(id, { tipo, acessos_id });
  res.status(response.code).json(response);
});

//===============================ACCESS===============================//
//Create
router.post("/access", async (req, res) => {
  const { login, register, home, contas, bancos, dash } = req.body;
  const response = await controllerAccess.create({
    login,
    register,
    home,
    contas,
    bancos,
    dash,
  });
  res.status(response.code).json(response);
});

//Delete
router.delete("/access/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerAccess.delete(id);
  res.status(response.code).json(response);
});

//Index
router.get("/access", verifyJwt, async (req, res) => {
  const response = await controllerAccess.index();
  res.status(response.code).json(response);
});

//Show
router.get("/access/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerAccess.show(id);
  res.status(response.code).json(response);
});

//Update
router.put("/access/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { login, register, home, contas, bancos, dash } = req.body;
  const response = await controllerAccess.update(id, {
    login,
    register,
    home,
    contas,
    bancos,
    dash,
  });
  res.status(response.code).json(response);
});

//===============================CATEGORY===============================//
//Create
router.post("/category", verifyJwt, async (req, res) => {
  const { titulo, cor } = req.body;
  const response = await controllerCategory.create({ titulo, cor });
  res.status(response.code).json(response);
});

//Delete
router.delete("/category/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerCategory.delete(id);
  res.status(response.code).json(response);
});

//Index
router.get("/categories", verifyJwt, async (req, res) => {
  const response = await controllerCategory.index();
  res.status(response.code).json(response);
});

//Show
router.get("/category/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerCategory.show(id);
  res.status(response.code).json(response);
});

//Update
router.put("/category/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { titulo, cor } = req.body;
  const response = await controllerCategory.update(id, { titulo, cor });
  res.status(response.code).json(response);
});

//===============================TRANSATION===============================//
//Create
router.post("/transation", verifyJwt, async (req, res) => {
  const {
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    tipo,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  } = req.body;

  const response = await controllerTransation.create({
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    tipo,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  });
  res.status(response.code).json(response);
});

//Delete
router.delete("/transation/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerTransation.delete(id);
  res.status(response.code).json(response);
});

//Index
router.get("/transations", verifyJwt, async (req, res) => {
  const response = await controllerTransation.index();
  res.status(response.code).json(response);
});

//Show
router.get("/transation/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerTransation.show(id);
  res.status(response.code).json(response);
});

//Update
router.put("/transation/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    tipo,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  } = req.body;
  const response = await controllerTransation.update(id, {
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    tipo,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  });
  res.status(response.code).json(response);
});

//Index
router.get("/dashboard", verifyJwt, async (req, res) => {
  const response = await controllerTransation.dashboard();
  res.status(response.code).json(response);
});

//===============================BANK===============================//
//Create
router.post("/bank", verifyJwt, async (req, res) => {
  const { nome, saldo_atual, saldo_inicial } = req.body;
  const response = await controllerBank.create({
    nome,
    saldo_atual,
    saldo_inicial,
  });
  res.status(response.code).json(response);
});

//Delete
router.delete("/bank/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerBank.delete(id);
  res.status(response.code).json(response);
});

//Index
router.get("/banks", verifyJwt, async (req, res) => {
  const response = await controllerBank.index();
  res.status(response.code).json(response);
});

//Show
router.get("/bank/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const response = await controllerBank.show(id);
  res.status(response.code).json(response);
});

//Update
router.put("/bank/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { nome, saldo_atual, saldo_inicial } = req.body;
  const response = await controllerBank.update(id, {
    nome,
    saldo_atual,
    saldo_inicial,
  });
  res.status(response.code).json(response);
});

module.exports = router;
