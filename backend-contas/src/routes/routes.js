const express = require("express");
const router = express.Router();
const { userModel } = require("../models/userModel");
const controllerUser = require("../controllers/userController");

//================================USER================================//
//Create
router.post("/usuarios", async (req, res) => {
  const { nome, email, senha, perfil_id } = req.body;
  const user = await controllerUser.create({ nome, email, senha, perfil_id });
  res.json(user);
});

//Delete
router.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const user = await controllerUser.delete(id);
  res.json(user);
});

//Index
router.get("/usuarios", async (req, res) => {
  const users = await controllerUser.index();
  res.json(users);
});

//Show
router.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const users = await controllerUser.show(id);
  res.json(users);
});

//Update
router.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil_id } = req.body;
  const user = await controllerUser.update(id, { nome, email, senha, perfil_id });
  res.json(user);
});

//===============================PROFILE===============================//
module.exports = router;
