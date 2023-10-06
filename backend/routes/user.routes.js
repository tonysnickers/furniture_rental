const express = require('express')
const { createUser, getUser, editUser, deleteUser } = require('../controllers/user.controller')
const router = express.Router()


router.get('/', getUser)
router.post('/', createUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)


module.exports = router