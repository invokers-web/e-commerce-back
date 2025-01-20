const jwt = require("jsonwebtoken");

const createToken = (_id, name, email, phone) => {
    return jwt.sign(
        { id: _id, name: name, email: email, phone: phone },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = { createToken };
