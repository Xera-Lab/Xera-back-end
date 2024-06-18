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
          firstName: "Abdullah",
          lastName: "Mohamed",
          email: "super.admin@gmail.com",
          password: "123456",
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
