//! ======= [Controllers] =========
//? users
const getAllUsers = require(`${process.cwd()}/modules/admin/api/v1/controllers/users/getAllUsers`);
const createUser = require(`${process.cwd()}/modules/admin/api/v1/controllers/users/createUser`);


//! ======= [Middleware] =========
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);

const express = require('express');
const usersRouter = express.Router();

//? Roles
usersRouter.route('/users').get(getAllUsers);
usersRouter.route('/users').post(verifyPermision('create_user'), createUser);



module.exports = usersRouter;