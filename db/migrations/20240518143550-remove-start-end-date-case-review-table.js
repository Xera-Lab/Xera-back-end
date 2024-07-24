'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.removeColumn(
      {
        tableName: 'cases_review',
        schema: 'doctor'
      },
      'startDate',
    );

    await queryInterface.removeColumn(
      {
        tableName: 'cases_review',
        schema: 'doctor'
      },
      'endDate',
    );



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'cases_review',
        schema: 'doctor'
      },
      'startDate',
      {
        allowNull: true,
        type: Sequelize.DATE
      },
    );

    await queryInterface.addColumn(
      {
        tableName: 'cases_review',
        schema: 'doctor'
      },
      'endDate',
      {
        allowNull: true,
        type: Sequelize.DATE
      },
    );


  }
};
