'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: 'cases',
        schema: 'doctor'
      }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      caseUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      numberOfTooth: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      additionalNotes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      needMeeting: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      preferredCompletionDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      doctorId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assigneeId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: 'cases',
      schema: 'doctor'
    });
  }
};