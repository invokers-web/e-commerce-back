const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        const error = new Error("You must login first");
        error.statusCode = 401;
        throw error;
    }
    const token = authorization.split(" ")[1];
    try {
        const { _id, name, email, phone } = jwt.verify(
            token,
            process.env.JWT_LOGIN_SECRET
        );
        console.log(_id, name, email, phone);
        req.user = await userModel.findById(_id);

        next();
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error",
            success: false,
        });
    }
};

module.exports = { requireAuth };
