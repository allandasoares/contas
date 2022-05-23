const express = require("express");
const routes = require("./src/routes/routes");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./src/models/model");

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

//Create database
sequelize.sync().then(() => {
  console.log("Connected to DataBase!");
});

//Create server on port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
