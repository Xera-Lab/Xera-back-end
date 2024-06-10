const signUp = require(`${process.cwd()}/modules/auth/api/v1/controllers/signup`);
const login = require(`${process.cwd()}/modules/auth/api/v1/controllers/login`);

const express = require('express');
const authRouter = express.Router();



authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);


module.exports = authRouter;