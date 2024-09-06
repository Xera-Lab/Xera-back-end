require('dotenv').config();
const adminRoutes = require('./modules/admin/admin');
const casesRoutes = require('./modules/cases/cases');
const authRoutes = require('./modules/auth/auth');
const servicesRouter = require('./modules/services/services');
const doctorRouter = require('./modules/doctor/doctor');
const globalErrorHandler = require('./utils/errors/errorController');
const initJobs = require('./utils/jobs/initJobs');


const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration
var allowlist = ['https://stag.xeralab.com', 'https://stag-admin.xeralab.com']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate), express.json());


initJobs();



app.use('/api/v1', authRoutes);

app.use('/api/v1', casesRoutes, adminRoutes, servicesRouter, doctorRouter);



app.use(globalErrorHandler);


// Check if .env file exists and have APP_PORT defined in it else use 3000
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});