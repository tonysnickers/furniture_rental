const express = require('express');
const { createFurniture, getAllFurniture, editFurniture, deleteFurniture } = require('../controllers/furniture.controller');
const router = express.Router();

router.get('/', getAllFurniture)
router.post('/', createFurniture)
router.put('/:id', editFurniture)
router.delete('/:id', deleteFurniture)

module.exports = router