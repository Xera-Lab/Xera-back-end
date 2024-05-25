'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Add roleId to the Users table
    await queryInterface.addColumn('users', 'roleId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: async (queryWithContext, Sequelize) => {
    await queryInterface.removeColumn('users', 'roleId');

  }
};
