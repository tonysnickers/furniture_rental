const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { createBooking, getAllBookings } = require('../controllers/booking.controller')
const router = express.Router()

router.get('/', verifyToken, getAllBookings)
router.post('/create', verifyToken, createBooking)
router.get('/:id')
router.put('/:id')
router.delete('/:id')


module.exports = router