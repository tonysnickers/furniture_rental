const express = require('express')
const router = express.Router()

router.get('/')
router.get('/create')
router.get('/:id')
router.put('/:id')
router.delete('/:id')


module.exports = router