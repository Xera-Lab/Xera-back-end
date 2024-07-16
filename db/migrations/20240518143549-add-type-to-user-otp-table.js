'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        tableName: 'users_otp',
        schema: 'auth',
      },
      'otpType',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'users_otp',
        schema: 'auth',
      },
      'otpType',
    );


  }
};
