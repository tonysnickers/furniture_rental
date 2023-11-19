const userModel = require('../models/user.model');
const Furniture = require("../models/furniture.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()




module.exports.createUser = async (req, res) => {
    const {username, email, password, role} = req.body
    try {
        if (!(username && password && email)) return res.status(400).send('tout les champs sont obligatoires')

        const oldUser = await userModel.findOne({email})
        if (oldUser) return res.status(400).send('cette utilisateur existe déja')

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({username, email, password: encryptedPassword, role})
        // Create token
        const token = jwt.sign(
            { user_id: newUser._id, email, role },
            process.env.TOKEN_KEY,
        );
        newUser.token = token;
        res.status(200).json( newUser + 'crée avec succes')
    } catch (error) {
        res.json(error)
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        const user = await userModel.findOne({email})
        if (!user ) return res.status(400).send(' Votre email est incorrect')
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).send('Votre mot de passe est incorrect')

        const token = jwt.sign(
            { user_id: user._id, email, role },
            process.env.TOKEN_KEY,
            {
                expiresIn: '30min',
            }
        );
        user.token = token
    res.status(200).json({auth: true, user})
    } catch (error) {
        res.json({auth: false, error: 'Impossible de vous connecter veuillez vérifier vos identifiants'})
    }
}

module.exports.getAllUser = async (req, res) => {
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        res.json(error)
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports.editUser = async (req, res) => {
    const userId = req.user.user_id
    const {password, email, username, role} = req.body
    try {
        const updatedFields = {};
        if (!userId) {
            return res.status(400).json({ message: 'ID d\'utilisateur non valide' });
        }
        if (email !== undefined) {
            updatedFields.email = email;
        }
        if (username !== undefined) {
            updatedFields.username = username;
        }
        if (role !== undefined) {
            updatedFields.role = role;
        }
        if (password !== undefined) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }
        const user = await userModel.findByIdAndUpdate(userId, updatedFields, { new: true })
        if (!user) {
            res.json('Utilisateur non trouvé')
        } 
        res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteUser = async (req, res) => {
    const userId = req.user.user_id
    try {
        if (!userId) {
            return res.status(400).json({ message: 'ID d\'utilisateur non valide' });
        }
        await Furniture.deleteMany({ owner: userId });
        await userModel.findByIdAndDelete(userId)
        res.status(200).json(" ce user a bien été supprimé")
    } catch (error) {
        res.json(error)
    }
}

module.exports.getAllFurniture = async (req, res) => {
    try {
        const userId = req.params.id
        const userFurnitures = await Furniture.find({owner: userId}).populate('owner')
        res.status(200).json(userFurnitures)
    } catch (error) {
        res.json(error)
    }
}