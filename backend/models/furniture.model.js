const mongoose = require('mongoose')

const furnitureSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    description: {type: String, required: true},
    price_per_day: {type: Number, required: true},
    image: {type: String, required: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Furniture', furnitureSchema)