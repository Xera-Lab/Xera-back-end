'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'users_otp',
        schema: 'auth',
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        otp: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expireAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        counter: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      },
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'users_otp',
      schema: 'auth'
    });
  }
};