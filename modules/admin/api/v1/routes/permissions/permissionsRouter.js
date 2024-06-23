const express = require('express');
const permissionsRouter = express.Router();

//! ======= [Controllers] =========
const createPermission = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/createPermission`);
const updatePermission = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/updatePermission`);
const deletePermission = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/deletePermission`);
const getAllPermissions = require(`${process.cwd()}/modules/admin/api/v1/controllers/permissions/getAllPermissions`);

//! ======= [Middleware] =========
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);


// permissionsRouter.route('/permissions').post(verifyToken, verifyPermision('create_permission'), createPermission);
// permissionsRouter.route('/permissions/:id').patch(verifyToken, verifyPermision('update_permission'), updatePermission);
// permissionsRouter.route('/permissions/:id').delete(verifyToken, verifyPermision('delete_permission'), deletePermission);
// permissionsRouter.route('/permissions').get(verifyToken, verifyPermision('get_all_permissions'), getAllPermissions);
permissionsRouter.route('/permissions').post(verifyToken, createPermission);
permissionsRouter.route('/permissions/:id').patch(verifyToken, updatePermission);
permissionsRouter.route('/permissions/:id').delete(verifyToken, deletePermission);
permissionsRouter.route('/permissions').get(verifyToken, getAllPermissions);


module.exports = permissionsRouter;