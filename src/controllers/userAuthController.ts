import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/tokenControl";
import userAuthService from "../services/userAuth.service";

import { sendEmail } from "../utils/sendMail";
import { ValidationError } from "../errors/ValidationError";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, phone, avatar } = req.body;
        if (!name || !email || !password || !phone) {
            throw new ValidationError("All fields must be filled");
        }

        const user = await userAuthService.createUser({
            name,
            email,
            password,
            phone,
            avatar,
        });

        const mailSubject = "Thanks for Registering!";
        const mailHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                }
                table {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-collapse: collapse;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    overflow: hidden;
                }
                th, td {
                    padding: 20px;
                    text-align: left;
                }
                th {
                    background-color: red;
                    color: white;
                    text-align: center;
                }
                a {
                    color: red;
                    text-decoration: none;
                }
                .footer {
                    font-size: 12px;
                    text-align: center;
                    color: #888;
                    padding: 10px;
                }
                </style>
            </head>
            <body>
                <table>
                <thead>
                    <tr>
                        <th colspan="2">Welcome to Invokers!</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <p>Hi ${user.name},</p>
                            <p>Thank you for signing up for our service. We're excited to have you on board! Below are some useful links to help you get started:</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Getting Started Guide:</td>
                        <td><a href="https://example.com/start">Start Here</a></td>
                    </tr>
                    <tr>
                        <td>Support Center:</td>
                        <td><a href="https://example.com/support">Contact Support</a></td>
                    </tr>
                    <tr>
                        <td>Account Settings:</td>
                        <td><a href="https://example.com/account">Manage Your Account</a></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <p>If you have any questions, feel free to reach out to us anytime at <a href="mailto:support@example.com">support@example.com</a>.</p>
                            <p>Best regards,</p>
                            <p>The Invokers Team</p>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="footer">
                            &copy; 2025 Your Company. All rights reserved. <br>
                            <a href="https://example.com/privacy">Privacy Policy</a> | <a href="https://example.com/unsubscribe">Unsubscribe</a>
                        </td>
                    </tr>
                </tfoot>
                </table>
            </body>
        </html>
        `;

        await sendEmail({
            to: user.email,
            subject: mailSubject,
            html: mailHtml,
        });
        const token = createToken(user._id as string, user.name, user.email);

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        next(error)
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError("Email and Password are required")
        }
        const user = await userAuthService.loginUser({ email, password });
        const token = createToken(user._id as string, user.name, user.email);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token,
        });
    } catch (error) {
        next(error)
    }
};
