const sendEmail = require(`${process.cwd()}/utils/email/sendEmail`);

const sendWelcomeEmail = async (user) => {
    const { email, name } = user;
    const subject = 'Welcome to Xera Lab';

    const html = `
        <h1>Welcome ${name}</h1>
        <p>You are successfully registered with Xera Lab. You can login with your email and password</p>
    `;

    await sendEmail(email, subject, html);
};

module.exports = sendWelcomeEmail;