const doctorRouter = require(`${process.cwd()}/modules/doctor/api/v1/routes/doctorRouter`);

const express = require('express');
const router = express.Router();


router.use('/doctor', doctorRouter);


module.exports = router;