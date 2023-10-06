const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
res.json({message: "voici les données"})
})

router.post('/', (req, res) => {
    res.json({user: req.body})
})
router.put('/:id', (req, res) => {
    res.json({userId: req.params.id})
})
router.delete('/:id', (req, res) => {
    res.json({userId: req.params.id + " a été supprimé"})
})


module.exports = router