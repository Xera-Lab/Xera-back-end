'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'cases',
        schema: 'doctor',
      },
      'supervisorId',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      {
        tableName: 'cases',
        schema: 'doctor',
      },
      'techCaseUrl',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'cases',
        schema: 'doctor',
      },
      'supervisorId',
    );
    await queryInterface.removeColumn(
      {
        tableName: 'cases',
        schema: 'doctor',
      },
      'techCaseUrl',
    );

  }
};
