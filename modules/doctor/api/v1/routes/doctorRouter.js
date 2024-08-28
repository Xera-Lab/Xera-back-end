const editProfile = require(`${process.cwd()}/modules/doctor/api/v1/controllers/editProfile`);


const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);
const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);
const express = require('express');
const doctorRouter = express.Router();



doctorRouter.route('/edit-profile').post(verifyToken, editProfile);



module.exports = doctorRouter;