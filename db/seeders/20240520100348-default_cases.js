'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'cases',
      [
        {
          title: 'Sergeren Guide',
          price: 1000,
          shortDescription: 'Sergeren Guide',
          description: 'Sergeren Guide',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'CAD',
          price: 2500,
          shortDescription: 'CAD',
          description: 'CAD description here will be here later on will be here later on',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cases', null, {});
  }
};
