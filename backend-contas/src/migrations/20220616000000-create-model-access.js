'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('acessos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING
      },
      register: {
        type: Sequelize.STRING
      },
      home: {
        type: Sequelize.STRING
      },
      contas: {
        type: Sequelize.STRING
      },
      dash: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('acessos');
  }
};