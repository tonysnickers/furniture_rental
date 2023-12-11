const userModel = require('../models/user.model');
const Furniture = require("../models/furniture.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp');
require('dotenv').config()
const cloudinary = require('../cloudinary/cloudinary');





module.exports.createUser = async (req, res) => {
    const {username, email, password} = req.body
    const oldUser = await userModel.findOne({email})
    try {
        if (!( password && email)) return res.status(400).send({ registred: false, error: 'tout les champs sont obligatoires'})
        if (oldUser) return res.status(400).send( {registred: false, error: 'Cette utilisateur existe déja !!'})
        await cloudinary.uploader.upload_stream({folder: 'User_Avatar'}, async (error, result) => {
            if (error) {
                return res.status(500).json({ registred: false, error: 'Erreur lors de l\'envoi de l\'image sur Cloudinary' });
            } 
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({username, email, avatar: result.url, password: encryptedPassword})
            
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
            );
            user.token = token;
            res.status(200).json({ registred: true, user} )
        }).end(req.file.buffer);
    } catch (error) {
        res.json({registred: false, error})
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if (!user ) return res.status(400).json({auth: false, error: ' Votre email est incorrect'})
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).json({auth: false, error: 'Votre mot de passe est incorrect'})

        const token = jwt.sign(
            { user_id: user._id, email },
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
        if (req.file) {
            cloudinary.uploader.upload_stream({ folder: 'User_Avatar' }, async (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi de la nouvelle image sur Cloudinary' });
                }
                updatedFields.avatar = result.url
                const user = await userModel.findByIdAndUpdate( userId, updatedFields , { new: true });
                if (!user) {
                    res.json('Utilisateur non trouvé')
                } 
                res.status(201).json({success: true, message: 'ton profil a été mise à jour', user})
            }).end(req.file.buffer);
            }
        else {
            const user = await userModel.findByIdAndUpdate( userId, updatedFields, { new: true });
            if (!user) {
                    res.json('Utilisateur non trouvé')
                } 
                res.status(201).json({success: true, message: 'ton profil a été mise à jour', user})
        }
    } catch (error) {
        res.status(500).json({success: false, message: 'Une erreur est survenue veuillez réessayer'})
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