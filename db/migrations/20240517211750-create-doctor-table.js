'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'doctor',
        schema: 'doctor',
      },
      {
        doctorId: {
          type: Sequelize.STRING,
          unique: true,
          primaryKey: true
        },
        authId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'auth_user',
              schema: 'auth'
            },
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dentalPracticeName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        practiceAddress: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        specialty: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'doctor',
      schema: 'doctor'
    });
  }
};