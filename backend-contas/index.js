const express = require("express");
const routes = require("./src/routes/routes");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config({path:__dirname+'/.env'})

app.use(cors());
app.use(bodyParser.json()); 
app.use(routes);         

//Create database
// sequelize.sync().then(() => {
//   console.log("Connected to DataBase!");
// });

//Create server on port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
