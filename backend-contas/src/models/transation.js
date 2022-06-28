"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transation extends Model {}

  Transation.init(
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      data_venc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_pag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modo_pagamento: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Transation",
      tableName: "transacoes",
    }
  );
  return Transation;
};
