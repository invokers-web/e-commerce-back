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
    favicon: {
        type: String,
        required: [true, "Favicon URL is required"]
    },
    contact: {
        address: {
            type: String,
            required: [true, "Address is required"]
        },
        hotline: {
            type: String,
            required: [true, "Phone number is required"]
        },
        phones: [
            {
                type: String,
                required: [true, "Phone number is required"]
            }
        ],
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        socialMedia: [
            {
                image: {
                    type: String,
                    required: [true, "Social media image is required"]
                },
                url: {
                    type: String,
                    required: [true, "Social media URL is required"]
                }
            }
        ]
    }
})