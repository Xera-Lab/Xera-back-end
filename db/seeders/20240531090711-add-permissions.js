'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'permission',
        schema: 'auth',
      },
      [
        {
          name: 'create_case_status',
          displayName: 'Create Case Status',
          description: 'Create new case status',
        },

        {
          name: 'update_case_status',
          displayName: 'Update Case Status',
          description: 'Update case status',
        },
        {
          name: 'delete_case_status',
          displayName: 'Delete Case Status',
          description: 'Delete case status',
        },
        {
          name: 'get_all_case_statuss',
          displayName: 'Get All Case Statuss',
          description: 'Get all case statuss',
        },
        {
          name: 'create_permission',
          displayName: 'Create Permission',
          description: 'Create new permission',
        },

        {
          name: 'update_permission',
          displayName: 'Update Permission',
          description: 'Update permission',
        },
        {
          name: 'delete_permission',
          displayName: 'Delete Permission',
          description: 'Delete permission',
        },
        {
          name: 'get_all_permissions',
          displayName: 'Get All Permissions',
          description: 'Get all permissions',
        },
        {
          name: 'create_role',
          displayName: 'Create Role',
          description: 'Create new role',
        },

        {
          name: 'update_role',
          displayName: 'Update Role',
          description: 'Update role',
        },
        {
          name: 'delete_role',
          displayName: 'Delete Role',
          description: 'Delete role',
        },
        {
          name: 'get_all_roles',
          displayName: 'Get All Roles',
          description: 'Get all roles',
        },


      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'permission',
        schema: 'auth',
      },
      null,
      {},
    );
  }
};
