const express = require('express');
const { getAllFurniture, editFurniture, deleteFurniture, createFurnitures } = require('../controllers/furniture.controller');
const router = express.Router();

router.get('/', getAllFurniture)
router.post('/:id/create', createFurnitures)
router.put('/:id', editFurniture)
router.delete('/:id', deleteFurniture)

module.exports = router