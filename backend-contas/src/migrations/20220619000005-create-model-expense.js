"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("despesas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
      },
      data_venc: {
        type: Sequelize.STRING,
      },
      data_pag: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      modo_pagamento: {
        type: Sequelize.STRING,
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "categorias", key: "id" },
        constraint: true,
      },
      banco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "bancos", key: "id" },
        constraint: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("despesas");
  },
};
