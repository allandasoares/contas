const express = require("express");
const routes = require("./src/routes/routes");
const app = express();
const { sequelize } = require("./src/models/model");

app.use("/", routes);

sequelize.sync().then(() => {
  console.log("Conectado ao Banco de Dados");
});

app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000!");
});
