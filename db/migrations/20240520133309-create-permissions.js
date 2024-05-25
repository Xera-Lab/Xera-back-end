'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
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
      description: Sequelize.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');

  }
};
