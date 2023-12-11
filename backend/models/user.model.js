const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Furniture = require('./furniture.model')

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: false},
    email: {type: String, unique: true, lowercase: true, trim: true, required: true},
    password: {type: String, minlength: 6, required: true},
    avatar: [{ type: String,}],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: false
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Furniture',
    }],
    token: { type: String },
}, {
    timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema)
