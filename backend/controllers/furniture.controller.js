const { verifyToken } = require("../middleware/auth");
const Furniture = require("../models/furniture.model");
const userModel = require("../models/user.model");
const cloudinary = require('../cloudinary/cloudinary');


module.exports.createFurnitures =  async (req, res) => {
    const { name, description, price_per_day, city} = req.body;
    const user = await userModel.findById(req.user.user_id)
    try {
        if (req.files && req.files.length > 0) {
            const imageUploadPromises = req.files.map(file =>
                new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: 'img_furnitures' }, (error, result) => {
                        if (error) {
                            reject('Erreur lors de l\'envoi de l\'image sur Cloudinary');
                        } else {
                            resolve(result.url);
                        }
                    }).end(file.buffer);
                })
            );
            const imageUrls = await Promise.all(imageUploadPromises);
            const newFurniture = await Furniture.create({
                name,
                description,
                images: imageUrls, 
                city,
                price_per_day,
                owner: user._id,
            });

            user.products.push(newFurniture);
            await user.save();
            res.json(newFurniture);
        } else {
            res.json('Veuillez ajouter des photos de vos articles');
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de furniture' });
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

module.exports.getFurniture = async (req, res) => {
    const furnitureId = req.params.id
    try {
        const furniture = await Furniture.findById(furnitureId)
        if (!furniture) {
            res.status(404).json(({message: "Article non trouvée"}))
        }
        res.status(200).json(furniture)
    } catch (error) {
        
    }
}

module.exports.getUserFurnitures = async (req, res) => {
    try {
        const userFurnitures = await Furniture.find({owner: req.user.user_id}).populate('owner')
        if (userFurnitures.length < 1) return res.status(404).json({ message: "Vous n'avez pas d'article" });
        res.json({ userFurnitures });
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports.editFurniture = async (req, res) => {
    const furnitureId = req.params.id;
    try {
        const furniture = await Furniture.findById(furnitureId);

        if (!furniture) {
            return res.status(404).send('Article non trouvé');
        }

        // Vérification des permissions
        if (req.user.user_id.toString() !== furniture.owner.toString()) {
            return res.status(403).send('Vous ne pouvez pas modifier un article qui ne vous appartient pas');
        }

        await Furniture.findByIdAndUpdate(furnitureId, req.body)
        res.json({message: "votre article a bien été modifié"})
    } catch (error) {
        res.json(error)
    }
}

module.exports.deleteFurniture = async (req, res) => {
    const furnitureId = req.params.id;
    try {
        const furniture = await Furniture.findById(furnitureId);
        if (!furniture) return res.status(404).send('Article non trouvé');
    
        // Vérification des permissions
        if (req.user.user_id.toString() !== furniture.owner.toString()) {
            return res.status(403).send('Vous ne pouvez pas supprimer un article qui ne vous appartient pas');
        }
        await Furniture.findById(furnitureId).deleteOne()
        res.json({message: "votre furniture a été supprimé"})
    } catch (error) {
        res.json(error)
    }
}

