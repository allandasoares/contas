"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}

  Category.init(
    {
      titulo: {
        type: DataTypes.STRING,
      },
      cor: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categorias",
    }
  );
  return Category;
};
