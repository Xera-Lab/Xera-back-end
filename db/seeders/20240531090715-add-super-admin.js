'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'super_admin',
        schema: 'admin',
      },
      [
        {
          authId: 1,
          superAdminId: "SUPER_1",
        },

      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'super_admin',
        schema: 'admin',
      },
      null,
      {},
    );
  }
};
