const userModel = require('../models/user.model');
const Furniture = require("../models/furniture.model")


module.exports.createUser = async (req, res) => {
    try {
        const new_user = await userModel.create({...req.body})
        res.json({message: new_user + " a bien été crée"})
    } catch (error) {
        res.json(error)
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
        const user = await userModel.findByIdAndUpdate(id, req.body, {new: true})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const useTodelete = await userModel.findByIdAndDelete(req.params.id)
        res.json(" ce user a bien été supprimé")
    } catch (error) {
        res.json(error)
    }
}

module.exports.getAllFurniture = async (req, res) => {
    try {
        const userId = req.params.id
        const userFurnitures = await Furniture.find({owner: userId}).populate('owner')
        res.json(userFurnitures)
    } catch (error) {
        res.json(error)
    }
}