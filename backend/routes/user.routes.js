const express = require('express')
const { createUser, editUser, deleteUser, getAllUser, getUser } = require('../controllers/user.controller')
const router = express.Router()


router.get('/', getAllUser)
router.post('/', createUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)


module.exports = router