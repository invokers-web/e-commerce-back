import mongoose, { Schema, Document, Types } from "mongoose";

enum OrderStatus {
    pending = "pending",
    processing = "processing",
    shipped = "shipped",
    delivered = "delivered",
    cancelled = "cancelled"
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    cart: Types.ObjectId;
    address: Types.ObjectId;
    shipping_cost: number;
    total: number;
    status: OrderStatus | "pending";
    createdAt: Date;
    updatedAt: Date;
}
const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    shipping_cost: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true })

export default mongoose.model<IOrder>("Order", orderSchema);