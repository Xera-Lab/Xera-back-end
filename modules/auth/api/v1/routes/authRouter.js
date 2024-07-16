const signUp = require(`${process.cwd()}/modules/auth/api/v1/controllers/signup`);
const login = require(`${process.cwd()}/modules/auth/api/v1/controllers/login`);
const sendOtp = require(`${process.cwd()}/modules/auth/api/v1/controllers/sendOtp`);
const verifyOtp = require(`${process.cwd()}/modules/auth/api/v1/controllers/verifyOtp`);
const resetPassword = require(`${process.cwd()}/modules/auth/api/v1/controllers/resetPassword`);
const changePassword = require(`${process.cwd()}/modules/auth/api/v1/controllers/changePassword`);

const express = require('express');
const authRouter = express.Router();



authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);
authRouter.route('/send-otp').post(sendOtp);
authRouter.route('/verify-otp').post(verifyOtp);
authRouter.route('/reset-password').post(resetPassword);
authRouter.route('/change-password').post(changePassword);


module.exports = authRouter;