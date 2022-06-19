"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Access extends Model {}

  Access.init(
    {
      login: {
        type: DataTypes.STRING,
      },
      register: {
        type: DataTypes.STRING,
      },
      home: {
        type: DataTypes.STRING,
      },
      contas: {
        type: DataTypes.STRING,
      },
      dash: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Access",
      tableName: "acessos",
    }
  );
  return Access;
};
