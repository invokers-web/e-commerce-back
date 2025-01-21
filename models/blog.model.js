const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String, 
    required: false, 
  },
});

module.exports = mongoose.model("Blog", blogsSchema);
