const furnitureModel = require("../models/furniture.model")

module.exports.createFurniture = async (req, res) => {
    try {
        const new_furniture = await furnitureModel.create({...req.body})
        res.json({message: 'votre furniture a bien été crée'})
    } catch (error) {
        res.json({error})
    }
}

module.exports.getAllFurniture = async (req, res) => {
    try {
        const furniture = await furnitureModel.find();
        res.json(furniture)
    } catch (error) {
        res.json(error)
    }
}

module.exports.editFurniture = async (req, res) => {
    try {
        const id = req.params.id;
        await furnitureModel.findByIdAndUpdate(id, req.body)
        res.json({message: "votre furniture a bien été modifié"})
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteFurniture = async (req, res) => {
    try {
        const id = req.params.id;
        await furnitureModel.findById(id).deleteOne()
        res.json({message: "votre furniture a été supprimé"})
    } catch (error) {
        res.json(error)
    }
}

