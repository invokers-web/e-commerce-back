import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    password: string;
    isAdmin?: boolean;
    isSeller?: boolean;
    wishlist?: mongoose.Types.ObjectId[];
    verified?: boolean;
    active?: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            unique: true,
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;
