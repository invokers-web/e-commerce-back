const jwt = require("jsonwebtoken");
const { handleError } = require("./handleError");

const createToken = (_id, name, email) => {
    return jwt.sign(
        { id: _id, name: name, email: email },
        process.env.JWT_LOGIN_SECRET,
        { expiresIn: "7d" }
    );
};
const verifyToken = (token) => {
    const destructedToken = jwt.verify(token, process.env.JWT_LOGIN_SECRET);
    if (!destructedToken) {
        handleError("Token Expired", 401);
    }
    return destructedToken;
};
module.exports = { createToken, verifyToken };
