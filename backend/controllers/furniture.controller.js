const Furniture = require("../models/furniture.model")



module.exports.createFurnitures = async (req, res) => {
    try {
        const { name, description, price_per_day, city} = req.body;
        const userId = req.params.id
        const new_furniture = new Furniture({name, description, city, price_per_day, owner: userId})
        await new_furniture.save()
        res.json({message: 'votre furniture a bien été crée ' + new_furniture})
        console.log(new_furniture);
    } catch (error) {
        res.json({error})
        console.log(error);
    }
}

module.exports.getAllFurniture = async (req, res) => {
    try {
        const furniture = await Furniture.find();
        res.json(furniture)
    } catch (error) {
        res.json(error)
    }
}

module.exports.editFurniture = async (req, res) => {
    try {
        const id = req.params.id;
        await Furniture.findByIdAndUpdate(id, req.body)
        res.json({message: "votre furniture a bien été modifié"})
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteFurniture = async (req, res) => {
    try {
        const id = req.params.id;
        await Furniture.findById(id).deleteOne()
        res.json({message: "votre furniture a été supprimé"})
    } catch (error) {
        res.json(error)
    }
}

