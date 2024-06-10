const sendEmail = require(`${process.cwd()}/utils/email/sendEmail`);

const sendWelcomeEmail = async (user) => {
    const { email, name } = user;
    // const subject = 'Welcome to Xera Lab';
    const subject = 'Welcome to My heart';

    // const html = `
    //     <h1>Welcome ${name}</h1>
    //     <p>You are successfully registered with Xera Lab. You can login with your email and password</p>
    // `;

    const html = `
        <h1>Welcome ${name}</h1>
        <img src="https://i0.wp.com/www.southsideblooms.com/wp-content/uploads/2023/01/pexels-lisa-2106037.jpg?w=1200&ssl=1" alt="Love">
    `;
    await sendEmail(email, subject, html);
};

module.exports = sendWelcomeEmail;