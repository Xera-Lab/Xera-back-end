'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'service',
        schema: 'doctor'
      },
      'imageUrl',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'service',
        schema: 'doctor'
      },
      'imageUrl',
    );
  }
};
