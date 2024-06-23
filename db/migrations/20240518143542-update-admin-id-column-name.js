'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      {
        tableName: 'admin',
        schema: 'admin',
      },
      'adminId',
      'userId',
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      {
        tableName: 'admin',
        schema: 'admin',
      },
      'userId',
      'adminId',
    );
  }
};