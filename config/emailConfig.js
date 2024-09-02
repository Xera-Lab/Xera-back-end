const nodemailer = require('nodemailer');
const { port } = require('pg/lib/defaults');


const mailer = nodemailer.createTransport({
    host: 'mail.xeralab.com',
    port: 465,
    auth: {
        // user: process.env.EMAIL_USER, // Your email address
        // pass: process.env.EMAIL_PASS  // Your email password or app password
        user: 'info@xeralab.com', // Your email address
        pass: '12345678'  // Your email password or app password
    }
});

// Verify the connection configuration
mailer.verify((error, success) => {
    if (error) {
        console.error('Error configuring email mailer:', error);
    } else {
        console.log('Email mailer configured successfully:', success);
    }
});

module.exports = mailer;