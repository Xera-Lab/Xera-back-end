
const removeCases = require('./removeCasesJob.js');
const initJobs = () => {
    console.log('Running a task every minute init');
    removeCases();
};

module.exports = initJobs;