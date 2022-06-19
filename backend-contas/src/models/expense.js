"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {}

  Expense.init(
    {
      titulo: {
        type: DataTypes.STRING,
      },
      descricao: {
        type: DataTypes.STRING,
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
      },
      data_venc: {
        type: DataTypes.STRING,
      },
      data_pag: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      modo_pagamento: {
        type: DataTypes.STRING,
      },
      categoria_id: {
        type: DataTypes.STRING,
        allowNull: false,
        constraint: true,
        foreignKey: "categoria_id",
      },
      banco_id: {
        type: DataTypes.STRING,
        allowNull: false,
        constraint: true,
        foreignKey: "banco_id",
      },
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "despesas",
    }
  );
  return Expense;
};
