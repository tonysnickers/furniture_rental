const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    start_date: {type: Date,  required: true},
    end_date: {type: Date,  required: true},
    total_price: {type: Number},
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Furniture' }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
    }
)


const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking