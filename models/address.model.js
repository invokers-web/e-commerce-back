const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    zipCode: {
        type: String,
        required: [true, "Zip Code is required"]
    }
})

module.exports = mongoose.model("Address", addressSchema);