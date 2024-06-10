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
          name: 'create_role',
          displayName: 'Create Role',
          description: 'This permission allows you to create roles',
        },
        {
          name: 'update_role',
          displayName: 'Update Role',
          description: 'This permission allows you to update roles',
        },
        {
          name: 'delete_role',
          displayName: 'Delete Role',
          description: 'This permission allows you to delete roles',
        },
        {
          name: 'get_all_roles',
          displayName: 'Get All Roles',
          description: 'This permission allows you to get all roles',
        },
        {
          name: 'create_permission',
          displayName: 'Create Permission',
          description: 'This permission allows you to create permissions',
        },
        {
          name: 'update_permission',
          displayName: 'Update Permission',
          description: 'This permission allows you to update permissions',
        },
        {
          name: 'delete_permission',
          displayName: 'Delete Permission',
          description: 'This permission allows you to delete permissions',
        },
        {
          name: 'get_all_permissions',
          displayName: 'Get All Permissions',
          description: 'This permission allows you to get all permissions',
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
