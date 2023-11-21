const mongoose = require('mongoose')

const furnitureSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    description: {type: String, required: true},
    price_per_day: {type: Number, required: true},
    // image: {type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
    }

)
const Furniture = mongoose.model('Furniture', furnitureSchema)



module.exports = Furniture