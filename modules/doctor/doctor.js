const doctorRouter = require(`${process.cwd()}/modules/doctor/api/v1/routes/doctorRouter`);
const verifyToken = require(`${process.cwd()}/utils/middleware/authentication/verifyToken`);

const express = require('express');
const router = express.Router();


router.use('/doctor', verifyToken, doctorRouter);


module.exports = router;