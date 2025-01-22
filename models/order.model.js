const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shipping_cost:{
        type: Number,
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    }
})