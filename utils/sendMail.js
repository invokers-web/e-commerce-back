const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: `"Invokers Software" <${process.env.NODEMAILER_EMAIL}>`,
        to,
        subject,
        replyTo: "no-reply@invokers.com",
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error) {
        
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = { sendEmail };
