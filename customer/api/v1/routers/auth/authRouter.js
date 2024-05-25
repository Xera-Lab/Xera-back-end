const signUp = require(`${process.cwd()}/customer/api/v1/controllers/auth/signup`);
const login = require(`${process.cwd()}/customer/api/v1/controllers/auth/login`);

const express = require('express');
const authRouter = express.Router();



authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);


module.exports = authRouter;