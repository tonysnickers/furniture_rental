const multer = require('multer')
const sharp = require('sharp');
// const { image } = require('../cloudinary/cloudinary');
const path = require('path');
const fs = require('fs');
const uploadDirectory = path.join(__dirname, '../uploads/');





module.exports.uploads = multer(multer.memoryStorage())

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDirectory)
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

// // file validation 
// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     } else {
//         cb({messgae: 'Unsuported File Format'}, false)
//     }
// }

// const uploadss = multer({ 
//     storage: storage,
//     limit: { fileFilter: 1024 * 1024 },
//     fileFilter: fileFilter
// })

// module.exports = uploadss