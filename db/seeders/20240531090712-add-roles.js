'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'role',
        schema: 'auth',
      },
      [
        {
          name: 'Super Admin',
        },
        {
          name: 'Admin',
        },
        {
          name: 'Supervisor',
        },
        {
          name: 'Technician',
        },
        {
          name: 'Doctor',
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'role',
        schema: 'auth',
      },
      null,
      {},
    );
  }
};
