import { ValidationError } from "../errors/ValidationError";

import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import validator from "validator";

class userAuthService {
    #normalizeEgyptianPhoneNumber(phone: string) {
        const regex = /^(\+2|2|002)?0(10|11|12|15)(\d{8})$/;
        const match = phone.match(regex);

        if (match) {
            const networkCode = match[2];
            const mainNumber = match[3];
            return `20${networkCode}${mainNumber}`;
        } else {
            throw new ValidationError("Invalid Egyptian phone number format");
        }
    }

    async createUser({
        name,
        email,
        password,
        phone,
        avatar,
    }: {
        name: string;
        email: string;
        password: string;
        phone: string;
        avatar?: string;
    }) {
        if (!validator.isEmail(email)) {
            throw new ValidationError("Invalid email")
        }
        const emailExists = await userModel.findOne({ email: email });
        if (emailExists) {
            throw new ValidationError("Email already exists")
        }
        const phoneExists = await userModel.findOne({ phone: phone });
        if (phoneExists) {
            throw new ValidationError("Phone number already exists")
        }
        if (!validator.isStrongPassword(password)) {
            throw new ValidationError("Password not strong enough")
        }

        const normalizedPhone = this.#normalizeEgyptianPhoneNumber(phone);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            avatar: avatar,
            phone: normalizedPhone,
        });
        return user;
    }
    async loginUser({ email, password }: {
        email: string;
        password: string;
    }) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new ValidationError("Invalid email or password")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ValidationError("Invalid email or password")
        }
        return user;
    }
}

export default new userAuthService();
