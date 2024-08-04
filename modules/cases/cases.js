const casesRouter = require('./api/v1/routers/casesRouter');

const express = require('express');
const router = express.Router();


router.use('/cases', casesRouter);


module.exports = router;