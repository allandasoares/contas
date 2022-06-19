//Creating the sequelize instance
const Sequelize = require("sequelize");
const configDatabase = require('./config').development;
const sequelize = new Sequelize(configDatabase);

module.exports = sequelize;
