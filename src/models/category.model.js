const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: Map,
      of: String, 
      required: [true, "Category name is required"],
    },
    slug: {
      type: String,
      required: [true, "slug name is required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: Map,
      of: String, 
      required: [true, "Description is required"],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: {
      type: String,
      required: [true, "Category image is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
