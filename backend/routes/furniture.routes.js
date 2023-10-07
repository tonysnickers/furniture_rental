const express = require('express');
const router = express.Router();

router.get('/', getAllFurniture)
router.post('/', createFurniture)
router.put('/:id', editFurniture)
router.delete('/:id', deleteFurniture)

module.exports = router