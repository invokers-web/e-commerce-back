const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");

class userAuthService {
    #normalizeEgyptianPhoneNumber(phone) {
        const regex = /^(\+2|2|002)?0(10|11|12|15)\d{8}$/;
        const match = phone.match(regex);

        if (match) {
            const fullPrefix = match[2];
            const number = match[3];
            return `20${fullPrefix}${number}`;
        } else {
            const error = new Error("Invalid Egyptian phone number format");
            error.statusCode = 400;
            throw error;
        }
    }

    async createUser(userData) {
        if (!validator.isEmail(userData.email)) {
            const error = new Error("Invalid email format");
            error.statusCode = 400;
            throw error;
        }
        const emailExists = await userModel.findOne({ email: userData.email });
        if (emailExists) {
            const error = new Error(`Email already exists`);
            error.statusCode = 400;
            throw error;
        }
        const phoneExists = await userModel.findOne({ phone: userData.phone });
        if (phoneExists) {
            const error = new Error(`Phone number already exists`);
            error.statusCode = 400;
            throw error;
        }
        if (!validator.isStrongPassword(userData.password)) {
            const error = new Error("Password must be strong");
            error.statusCode = 400;
            throw error;
        }

        const phone = this.#normalizeEgyptianPhoneNumber(userData.phone);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user = await userModel.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            avatar: userData.avatar,
            phone: phone,
        });
        return user;
    }
    async loginUser({ email, password }) {
        const user = await userModel.findOne({ email });
        if (!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }
        return user;
    }
}

module.exports = new userAuthService();
