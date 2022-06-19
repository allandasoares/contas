"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {}
  Bank.init(
    {
      nome: {
        type: DataTypes.STRING,
      },
      saldo_atual: {
        type: DataTypes.DECIMAL(10, 2),
      },
      saldo_inicial: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      sequelize,
      modelName: "banco",
      tableName: "bancos",
    }
  );
  return Bank;
};
