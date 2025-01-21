const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  title: {
    type: String,
    required: [true, "Cart item title is required"],
  },
  image: {
    type: String, 
    required: [true, "Image is required"], 
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  shippingCost: {
    type: Number,
    required: false, 
    default: 0, 
  },
  count: {
    type: Number,
    required: [true, "Count is required"],
    min: [0, "Count cannot be negative"], 
  },
  inStock: {
    type: Boolean,
    required: [true, "In-stock status is required"],
  },
  status: {
    type: String,
    enum: ["available", "unavailable", "pending"],
    default: "available",
  },
});

module.exports = mongoose.model("Cart", cartSchema);
