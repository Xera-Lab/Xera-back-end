'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      {
        tableName: 'super_admin',
        schema: 'admin',
      },
      'superAdminId',
      'userId',
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      {
        tableName: 'super_admin',
        schema: 'admin',
      },
      'userId',
      'superAdminId',
    );
  }
};