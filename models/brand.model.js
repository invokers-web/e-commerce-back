const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "Brand name is required"],
    unique: true, 
    // trim: true,   
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  logo: {
    type: String, 
    required: [true, "Brand logo is required"], 
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active", 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Brand", brandSchema);
