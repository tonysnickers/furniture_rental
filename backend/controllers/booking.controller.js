const Booking = require("../models/booking.model");
const Furniture = require("../models/furniture.model");
const userModel = require("../models/user.model");

module.exports.createBooking = async (req, res) => {
    const { start_date, end_date, productId} = req.body;
    const userId = await userModel.findById(req.user.user_id)
    const bb = await Booking.find()
    try {
        if (start_date === Booking.startDate) {
            return "veuillez changer la date de départ"
        } else if (end_date === Booking.end_date) {
            return "veuillez changer la date de retour"
            
        } else {
            const product = await Furniture.findById(productId)
            const booking = await Booking.create({
                start_date: start_date,
                end_date: end_date,
                total_price: calculateTotalPrice(start_date, end_date, product.price_per_day),
                ownerId: userId,
                productId: productId
            })
            res.json({booked: true, message: "votre booking a bien été enregistré", booking})
        }
    } catch (error) {
        res.status(500).json({booked: false, message: "erreur lors du booking"})
    }

    function calculateTotalPrice(start_date, end_date, total_price) {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const pricePerDay = total_price * numberOfDays;
        return pricePerDay;
    }
}

module.exports.getAllBookings = async (req, res) => {
    const userId = await userModel.findById(req.user.user_id)

    try {
        if (userId.role === "admin") {
            const bookings = await Booking.find()
            res.status(200).json(bookings)
        } else {
            res.json({message: "vous n'avez acces aux booking"})
        }
    } catch (error) {
        res.status(400).json({message: "Impossible d'accèder aux booking"})
    }
}

module.exports.getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id
        const userId = req.user.user_id
        const bookings = await Booking.find({ _id: bookingId, ownerId: userId })
        if (!bookings) {
            res.json({message: "Vous n'avez pas de booking"})
        }
        res.status(200).json(bookings)
    } catch (error) {
        res.status(400).json(error)
    }
}