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
          name: 'SUPERADMIN',
          displayName: 'Super Admin',
        },
        {
          name: 'ADMIN',
          displayName: 'Admin',
        },
        {
          name: 'SUPERVISOR',
          displayName: 'Supervisor',
        },
        {
          name: 'TECHNICIAN',
          displayName: 'Technician',
        },
        {
          name: 'DOCTOR',
          displayName: 'Doctor',
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
