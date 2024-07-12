'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'cases_time_sheet',
        schema: 'doctor'
      }, 'caseStatus',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'cases_time_sheet',
        schema: 'doctor'
      },
      'caseStatus',
    );

  }
};
