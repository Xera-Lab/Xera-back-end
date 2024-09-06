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
          name: 'create_user',
          displayName: 'Create User',
          description: 'Create new user',
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
          name: 'assign_permission_to_role',
          displayName: 'Assign Permission to Role',
          description: 'Assign permission to role',
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
