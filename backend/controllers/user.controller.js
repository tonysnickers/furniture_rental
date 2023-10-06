const userModel = require('../models/user.model');

module.exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        const new_user = await userModel.create({...req.body})
        console.log(new_user);
        res.json({message: new_user + " a bien été crée"})
    } catch (error) {
        res.json(error)
        console.log('erreur lors de la creation de user' );
    }
}

module.exports.getUser = async (req, res) => {
    console.log(req.body);
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        res.json(error)
    }
}

module.exports.editUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const id = req.params.id
        const user = await userModel.findByIdAndUpdate(id, req.body, {new: true})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const useTodelete = await userModel.findByIdAndDelete(req.params.id)
        res.json(" ce user a bien été supprimé")
    } catch (error) {
        res.json(error)
    }
}