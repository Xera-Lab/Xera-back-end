const casesRouter = require('./api/v1/routers/casesRouter');

const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send('Doctor page');
});

router.use('/cases', casesRouter);


module.exports = router;