'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'auth_user',
        schema: 'auth',
      },
      [
        {
          roleId: 1,
          firstName: "Super",
          lastName: "Admin",
          email: "super.admin@gmail.com",
          password: "$2b$12$yUIwb1IJKmEAa5rPG1E4eeYTs942t8NMIPr7olzUbUFAXEiulkNv2",
        },

      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'auth_user',
        schema: 'auth',
      },
      null,
      {},
    );
  }
};
