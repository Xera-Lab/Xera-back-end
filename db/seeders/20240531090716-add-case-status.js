'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'case_status',
        schema: 'doctor',
      },
      [
        {
          status: "NEWCASE",
          displayName: "New Case",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "INPROGRESS",
          displayName: "In Progress",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "SENTTOREVIEW",
          displayName: "Sent to Review",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "INREVIEW",
          displayName: "In Review",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "REQUESTCHANGES",
          displayName: "Request Changes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "FINISHED",
          displayName: "Finished",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "DOCTORAPPROVED",
          displayName: "Doctor Approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "DOCTORREQUESTCHANGES",
          displayName: "Doctor Request Changes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'case_status',
        schema: 'doctor',
      },
      null,
      {},
    );
  }
};
