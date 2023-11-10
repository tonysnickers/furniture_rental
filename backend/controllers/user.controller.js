const userModel = require('../models/user.model');
const Furniture = require("../models/furniture.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()




module.exports.createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body
        if (!(username && password && email)) {
            res.status(400).send('tout les champs sont obligatoires')
        }

        const oldUser = await userModel.findOne({email})

        if (oldUser) {
            return res.status(400).send('cette utilisateur existe déja')
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const new_user = await userModel.create({username, email, password: encryptedPassword, })
        // Create token
        const token = jwt.sign(
            { user_id: new_user._id, email },
            process.env.TOKEN_KEY,
        );
        new_user.token = token;
        console.log(new_user);

        res.status(200).json({message: new_user + " a bien été crée"})
    } catch (error) {
        res.json(error)
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if (!user ) return res.status(400).send(' Votre email est incorrect')
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).send('Votre mot de passe est incorrect')

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '10min',
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
        console.log(req.params.id);
    } catch (error) {
        res.json(error)
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const id = req.params.id
        const {password, email, username} = req.body
        // const userId = userModel.findById(id)
        // if (!userId) {
        //     res.json('Utilisateur non trouvé')
        // } 
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.findByIdAndUpdate(id, {password: encryptedPassword, email, username}, { new: true })
        if (!user) {
            res.json('Utilisateur non trouvé')
        } 
        res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const useTodelete = await userModel.findByIdAndDelete(req.params.id)
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