const bookingModel = require("../models/booking.model");
const Furniture = require("../models/furniture.model");
const userModel = require("../models/user.model");

module.exports.createBooking = async (req, res) => {
    const { start_date, end_date, productId} = req.body;
    const userId = await userModel.findById(req.user.user_id)
    console.log(userId);
    try {
        const product = await Furniture.findById(productId)
            const booking = await bookingModel.create({
                start_date: start_date,
                end_date: end_date,
                total_price: calculateTotalPrice(start_date, end_date, product.price_per_day),
                ownerId: userId,
                productId: productId
            })
            res.json({booked: true, message: "votre booking a bien été enregistré", booking})
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