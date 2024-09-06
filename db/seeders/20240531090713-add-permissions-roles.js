'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'role_permissions',
        schema: 'auth',
      },
      [
        {
          roleId: 1,
          permissionId: 1,
        },

        {
          roleId: 1,
          permissionId: 2,
        },

        {
          roleId: 1,
          permissionId: 3,
        },

        {
          roleId: 1,
          permissionId: 4,
        },

        {
          roleId: 1,
          permissionId: 5,
        },

        {
          roleId: 1,
          permissionId: 6,
        },

        {
          roleId: 1,
          permissionId: 7,
        },

        {
          roleId: 1,
          permissionId: 8,
        },

        {
          roleId: 1,
          permissionId: 9,
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'role_permissions',
        schema: 'auth',
      },
      null,
      {},
    );
  }
};
