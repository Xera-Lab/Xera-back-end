const nodemailer = require('nodemailer');


const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
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