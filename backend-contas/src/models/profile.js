"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {}

  Profile.init(
    {
      tipo: {
        type: DataTypes.STRING,
      },
      acessos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        constraint: true,
        foreignKey: "acessos_id",
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
      modelName: "Profile",
      tableName: "perfil",
    }
  );
  return Profile;
};
