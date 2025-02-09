import mongoose, { Schema } from "mongoose";
import { ValidationError } from "../errors/ValidationError";
import { IUser } from "../models/user.model";
const jwt = require("jsonwebtoken");

const createToken = (_id: string, name: string, email: string) => {
    return jwt.sign(
        { id: _id, name: name, email: email },
        process.env.JWT_LOGIN_SECRET as string,
        { expiresIn: "7d" }
    );
};
const verifyToken = (token: string) => {
    const destructedToken = jwt.verify(token, process.env.JWT_LOGIN_SECRET as string);
    if (!destructedToken) {
        throw new ValidationError("Error with authentication")
    }
    return destructedToken;
};
export { createToken, verifyToken };
