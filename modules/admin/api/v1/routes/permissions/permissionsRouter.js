const express = require('express');
const permissionsRouter = express.Router();

//! ======= [Controllers] =========
const createPermission = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/createPermission`);
const updatePermission = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/updatePermission`);
const deletePermission = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/deletePermission`);
const getAllPermissions = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/getAllPermissions`);

//! ======= [Middleware] =========
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


permissionsRouter.route('/permissions').post(verifyPermision('create_permission'), createPermission);
permissionsRouter.route('/permissions/:id').patch(verifyPermision('update_permission'), updatePermission);
permissionsRouter.route('/permissions/:id').delete(verifyPermision('delete_permission'), deletePermission);
permissionsRouter.route('/permissions').get(verifyPermision('get_all_permissions'), getAllPermissions);


module.exports = permissionsRouter;