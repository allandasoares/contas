"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("perfil", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      acessos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "acessos", key: "id" },
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
    await queryInterface.dropTable("perfil");
  },
};
