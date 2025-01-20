const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    logo: {
        type: String,
        required: [true, "Logo URL is required"]
    },
    
    
})