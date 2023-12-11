const express = require('express');
const { getAllFurniture, editFurniture, deleteFurniture, createFurnitures, getUserFurnitures, getFurniture } = require('../controllers/furniture.controller');
const { verifyToken } = require('../middleware/auth');
const { uploads } = require('../multer/multer');
const router = express.Router();

router.get('/', getAllFurniture)
router.get('/user', verifyToken, getUserFurnitures)
router.post('/create', verifyToken, uploads.array('image', 4), createFurnitures)
router.get('/:id', getFurniture)
router.put('/:id', verifyToken, editFurniture)
router.delete('/:id', verifyToken, deleteFurniture)

module.exports = router