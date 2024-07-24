'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'case_status',
        schema: 'doctor'
      },
      'displayName',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'case_status',
        schema: 'doctor'
      },
      'displayName',
    );
  }
};
