const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email is already in use"],
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            unique: [true, "Phone is already in use"],
        },
        avatar: {
            type: String,
            default: "default_avatar.jpg",
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            select: false,
        },
        isSeller: {
            type: Boolean,
            default: false,
            select: false,
        },
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        verified: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
