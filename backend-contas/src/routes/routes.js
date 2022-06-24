const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/userController");
const controllerProfile = require("../controllers/profileController");
const controllerAccess = require("../controllers/accessController");
const controllerCategory = require("../controllers/categoryController");
const controllerExpense = require("../controllers/expenseController");
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
  console.log('USEID',req.userId)
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
router.post("/profiles", verifyJwt, async (req, res) => {
  const { tipo, acessos_id } = req.body;
  const profiles = await controllerProfile.create({ tipo, acessos_id });
  res.json(profiles);
});

//Delete
router.delete("/profiles/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const profiles = await controllerProfile.delete(id);
  res.json(profiles);
});

//Index
router.get("/profiles", verifyJwt, async (req, res) => {
  const profiles = await controllerProfile.index();
  res.json(profiles);
});

//Show
router.get("/profiles/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const profiles = await controllerProfile.show(id);
  res.json(profiles);
});

//Update
router.put("/profiles/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { tipo, acessos_id } = req.body;
  const profiles = await controllerProfile.update(id, { tipo, acessos_id });
  res.json(profiles);
});

//===============================ACCESS===============================//
//Create
router.post("/access", verifyJwt, async (req, res) => {
  const { login, register, home, contas, dash } = req.body;
  const access = await controllerAccess.create({
    login,
    register,
    home,
    contas,
    dash,
  });
  res.json(access);
});

//Delete
router.delete("/access/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const access = await controllerAccess.delete(id);
  res.json(access);
});

//Index
router.get("/access", verifyJwt, async (req, res) => {
  const access = await controllerAccess.index();
  res.json(access);
});

//Show
router.get("/access/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const access = await controllerAccess.show(id);
  res.json(access);
});

//Update
router.put("/access/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { login, register, home, contas, dash } = req.body;
  const access = await controllerAccess.update(id, {
    login,
    register,
    home,
    contas,
    dash,
  });
  res.json(access);
});

//===============================CATEGORY===============================//
//Create
router.post("/category", verifyJwt, async (req, res) => {
  const { titulo, cor } = req.body;
  const category = await controllerCategory.create({ titulo, cor });
  res.json(category);
});

//Delete
router.delete("/category/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const category = await controllerCategory.delete(id);
  res.json(category);
});

//Index
router.get("/categories", verifyJwt, async (req, res) => {
  const category = await controllerCategory.index();
  res.json(category);
});

//Show
router.get("/category/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const category = await controllerCategory.show(id);
  res.json(category);
});

//Update
router.put("/category/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { titulo, cor } = req.body;
  const category = await controllerCategory.update(id, { titulo, cor });
  res.json(category);
});

//===============================EXPENSE===============================//
//Create
router.post("/expense", verifyJwt, async (req, res) => {
  const {
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  } = req.body;

  const expense = await controllerExpense.create({
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  });
  res.json(expense);
});

//Delete
router.delete("/expense/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const expense = await controllerExpense.delete(id);
  res.json(expense);
});

//Index
router.get("/expenses", verifyJwt, async (req, res) => {
  const expense = await controllerExpense.index();
  res.json(expense);
});

//Show
router.get("/expense/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const expense = await controllerExpense.show(id);
  res.json(expense);
});

//Update
router.put("/expense/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  } = req.body;
  const expense = await controllerExpense.update(id, {
    titulo,
    descricao,
    valor,
    data_venc,
    data_pag,
    status,
    modo_pagamento,
    categoria_id,
    banco_id,
  });
  res.json(expense);
});

//===============================BANK===============================//
//Create
router.post("/bank", verifyJwt, async (req, res) => {
  const { nome, saldo_atual, saldo_inicial } = req.body;
  const bank = await controllerBank.create({
    nome,
    saldo_atual,
    saldo_inicial,
  });
  res.json(bank);
});

//Delete
router.delete("/bank/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const bank = await controllerBank.delete(id);
  res.json(bank);
});

//Index
router.get("/banks", verifyJwt, async (req, res) => {
  const bank = await controllerBank.index();
  res.json(bank);
});

//Show
router.get("/bank/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const bank = await controllerBank.show(id);
  res.json(bank);
});

//Update
router.put("/bank/:id", verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { nome, saldo_atual, saldo_inicial } = req.body;
  const bank = await controllerBank.update(id, {
    nome,
    saldo_atual,
    saldo_inicial,
  });
  res.json(bank);
});

module.exports = router;
