//! ======= [Controllers] =========
//? users
const getAllUsers = require(`${process.cwd()}/modules/admin/api/v1/controllers/users/getAllUsers`);
const createUser = require(`${process.cwd()}/modules/admin/api/v1/controllers/users/createUser`);


//! ======= [Middleware] =========
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);

const express = require('express');
const usersRouter = express.Router();

//? Roles
usersRouter.route('/users').get(verifyToken, getAllUsers);
usersRouter.route('/users').post(verifyToken, createUser);



module.exports = usersRouter;