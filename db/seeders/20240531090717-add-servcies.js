'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'service',
        schema: 'doctor',
      },
      [
        {
          name: "Surgical Guide",
          searchName: "surgical-guide",
          price: 250,
          description: 'Surgical Guide Description goes here ...',
          imageUrl: null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'service',
        schema: 'doctor',
      },
      null,
      {},
    );
  }
};
