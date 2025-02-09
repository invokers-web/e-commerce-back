import nodemailer from 'nodemailer';
import { SomethingWentWrongError } from '../errors/SomethingWentWrong';

interface IEmail {
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT || '465', 10),
    secure: process.env.NODEMAILER_PORT === '465',
    auth: {
        user: process.env.NODEMAILER_EMAIL as string,
        pass: process.env.NODEMAILER_PASSWORD as string,
    },
    debug: true, // Enable logs
    logger: true, // Log SMTP interactions
});

console.log({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT || '465', 10),
    auth: {
        user: process.env.NODEMAILER_EMAIL as string,
        pass: process.env.NODEMAILER_PASSWORD as string,
    },
    debug: true, // Enable logs
    logger: true, // Log SMTP interactions
})

export const sendEmail = async ({ to, subject, html }: IEmail) => {
    try {
        const mailOptions = {
            from: `"Invokers Software" <${process.env.NODEMAILER_EMAIL}>`,
            to,
            subject,
            replyTo: "no-reply@invokers.com",
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new SomethingWentWrongError();
    }
};
