const signUp = require(`${process.cwd()}/modules/auth/api/v1/controllers/signup`);
const login = require(`${process.cwd()}/modules/auth/api/v1/controllers/login`);
const sendOtp = require(`${process.cwd()}/modules/auth/api/v1/controllers/sendOtp`);
const verifyOtp = require(`${process.cwd()}/modules/auth/api/v1/controllers/verifyOtp`);

const express = require('express');
const authRouter = express.Router();



authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);
authRouter.route('/send-otp').post(sendOtp);
authRouter.route('/verify-otp').post(verifyOtp);


module.exports = authRouter;