const express = require('express');
const { getAllFurniture, editFurniture, deleteFurniture, createFurnitures, getUserFurnitures, getFurniture } = require('../controllers/furniture.controller');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllFurniture)
router.get('/user', verifyToken, getUserFurnitures)
router.post('/create', verifyToken, createFurnitures)
router.get('/:id', getFurniture)
router.put('/:id', verifyToken, editFurniture)
router.delete('/:id', verifyToken, deleteFurniture)

module.exports = router