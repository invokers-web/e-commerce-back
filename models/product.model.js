const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const productSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    basic_price: {
        type: Number,
        required: true
    },
    main_images: [{
        type: String,
        required: true
    }],
    availableSize: [ // SM
        {
            sizeId: {
                type: Schema.Types.ObjectId,
                ref: 'Size'
            },
            price: {
                type: Number,
                required: true
            },
            images: [{

            }]
        }
    ],
    availableColors: [ // black
        {
            colorId: {
                type: Schema.Types.ObjectId,
                ref: 'Color'
            },
            price: {
                type: Number,
                required: true
            },
            images: [{

            }]
        }
    ],

})