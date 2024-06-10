'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'permission',
        schema: 'auth',
      }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      displayName:
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.STRING,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'permission',
      schema: 'auth',
    },);

  }
};
