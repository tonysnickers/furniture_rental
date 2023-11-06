const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    password: {type: String, minlength: 6, required: true},
}, {
    timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema)