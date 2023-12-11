const express = require('express')
const { createUser, editUser, deleteUser, getAllUser, getUser, getAllFurniture, loginUser } = require('../controllers/user.controller')
const { verifyToken } = require('../middleware/auth')
const { uploads } = require('../multer/multer')
const router = express.Router()


router.get('/', getAllUser)
router.post('/register', uploads.single('avatar'), createUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.put('/', verifyToken, uploads.single('avatar'),  editUser)
router.delete('/', verifyToken, deleteUser)
router.get('/:id/furnitures', getAllFurniture)

// Middleware route
router.post('/verif_auth', verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
})


module.exports = router