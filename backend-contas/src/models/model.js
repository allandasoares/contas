const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize')

const UserModel = require('./userModel');
const user = UserModel(sequelize, Sequelize.DataTypes);

const ProfileModel = require('./profileModel');
const profile = ProfileModel(sequelize, Sequelize.DataTypes);

const db = {
    user,
    profile,
    sequelize
}

module.exports = db;
