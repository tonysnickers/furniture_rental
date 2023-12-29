const Booking = require("../models/booking.model");
const Furniture = require("../models/furniture.model");
const userModel = require("../models/user.model");

module.exports.createBooking = async (req, res) => {
    const { start_date, end_date, productId} = req.body;
    const userId = await userModel.findById(req.user.user_id)
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
            res.json({booked: true, message: "votre réservation a bien été enregistré", booking})
        }
    } catch (error) {
        res.status(500).json({booked: false, message: "erreur lors de la réservation"})
    }

   
}

module.exports.getAllBookings = async (req, res) => {
    const userId = await userModel.findById(req.user.user_id)

    try {
        if (userId || userId.role === "admin") {
            const bookings = await Booking.find()
            res.status(200).json(bookings)
        } else {
            res.json({message: "vous n'avez acces aux réservations"})
        }
    } catch (error) {
        res.status(400).json({message: "Impossible d'accèder aux réservations"})
    }
}

module.exports.getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id
        const userId = req.user.user_id
        const booking = await Booking.find({ _id: bookingId, ownerId: userId })
        if (!booking) {
            res.json({message: "Vous n'avez pas de réservation"})
        }
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.user_id
        const bookings = await Booking.find({ ownerId: userId })
        if (!bookings) {
            res.json({message: "Vous n'avez pas de réservation"})
        }
        res.status(200).json(bookings)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports.editBooking = async (req, res) => {
    const {start_date, end_date, total_price} = req.body
    const userId = req.user.user_id
    const bookingId = req.params.id
    let updatedFields = {}
    try {
        const booking = await Booking.find({_id: bookingId, ownerId: userId})
        if (!booking.length) {
            return res.json({message: "Réservation non trouvé"})
        } 

        const product = await Furniture.findById(booking[0].productId)

            if (start_date) {
                updatedFields.start_date = start_date
                if (!end_date) updatedFields.end_date = booking[0].end_date
            }

            if (end_date) {
                updatedFields.end_date = end_date 
                if (!start_date) updatedFields.start_date = booking[0].start_date
            } 

            // if ( !start_date && !end_date && !total_price) {
            //     // res.json({message: "Veuillez renseigner les champs"})
            // }

            if (!total_price) {
                updatedFields.total_price = calculateTotalPrice(updatedFields.start_date, updatedFields.end_date, product.price_per_day)
            }

            const newBooking = await Booking.findByIdAndUpdate(bookingId, updatedFields, { new: true })
            res.status(201).json({success: true, message: 'Votre réservation a été mise à jour', newBooking})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la modification votre réservation' });
    }
}

module.exports.deleteBooking = async (req, res) => {
    const userId = req.user.user_id
    const bookingId = req.params.id
    try {
        const booking = await Booking.findByIdAndDelete({_id: bookingId, ownerId: userId});
        if (!booking) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        res.json({ message: "Votre réservation a été supprimée avec succès." }); 
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la réservation.' });
        
    }
}

function calculateTotalPrice(start_date, end_date, total_price) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const pricePerDay = total_price * numberOfDays;
    return pricePerDay;
}