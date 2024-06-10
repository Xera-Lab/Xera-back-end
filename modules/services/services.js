const servicesRouter = require('./api/v1/routers/servicesRouter');

const express = require('express');
const router = express.Router();


router.use('/services', servicesRouter);


module.exports = router;