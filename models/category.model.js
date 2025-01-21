const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true, 
    trim: true,   
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  image: {
    type: String, 
    required: [true, "Category image is required"], 
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
    default: null, 
  },
  status: {
    type: String,
    enum: ["active", "inactive"], 
    default: "active", 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Category", categorySchema);
