const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    start_date: {type: Date,  required: true},
    end_date: {type: Date,  required: true},
    total_price: {type: Number},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Furniture' }],
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
    }
)


module.exports = mongoose.model('Booking', BookingSchema)