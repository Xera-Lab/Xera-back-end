const editProfile = require(`${process.cwd()}/modules/doctor/api/v1/controllers/editProfile`);


const verifyPermision = require(`${process.cwd()}/utils/middleware/authorization/verifyPermision`);
const express = require('express');
const doctorRouter = express.Router();



doctorRouter.route('/edit-profile').post(editProfile);



module.exports = doctorRouter;