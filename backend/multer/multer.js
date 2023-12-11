const multer = require('multer')
const sharp = require('sharp');




module.exports.uploads = multer(multer.memoryStorage())