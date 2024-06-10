require('dotenv').config({ path: `${process.cwd()}/.env` });
const adminRoutes = require('./modules/admin/admin');
const casesRoutes = require('./modules/cases/cases');
const authRoutes = require('./modules/auth/auth');
const servicesRouter = require('./modules/services/services');
const globalErrorHandler = require('./utils/errors/errorController');


const express = require('express');


const app = express();

app.use(express.json());


app.use('/api/v1/', casesRoutes, adminRoutes, authRoutes, servicesRouter);



app.use(globalErrorHandler);


// Check if .env file exists and have APP_PORT defined in it else use 4000
const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});