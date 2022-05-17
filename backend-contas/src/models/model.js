const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize')

const UsuariosModel = require('./usuariosModel');
const usuariosModel = UsuariosModel(sequelize, Sequelize.DataTypes);

const PerfilModel = require('./perfilModel');
const perfilModel = PerfilModel(sequelize, Sequelize.DataTypes);

const db = {
    usuariosModel,
    perfilModel,
    sequelize
}

module.exports = db;