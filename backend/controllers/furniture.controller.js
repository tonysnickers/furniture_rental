const { verifyToken } = require("../middleware/auth");
const Furniture = require("../models/furniture.model");
const userModel = require("../models/user.model");
const cloudinary = require('../cloudinary/cloudinary');
const {extractPublicId} = require('cloudinary-build-url')


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
                            resolve({
                                url: result.url,
                                // id: result.public_id
                            });
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

            user.products.push(newFurniture), { new: true };
            await user.save();
            res.json(newFurniture);
        } else {
            res.json('Veuillez ajouter des photos de vos articles');
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de furniture' + error });
    }
}

module.exports.getAllFurniture = async (req, res) => {
    try {
        const furniture = await Furniture.find();
        res.json({furniture})
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
        if (!userFurnitures.length) return res.status(404).json({ message: "Vous n'avez pas d'article" });
        res.json({ userFurnitures });
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports.editFurniture = async (req, res) => {
    const furnitureId = req.params.id;
    const userId = req.user.user_id
    const {name, city, description, price_per_day} = req.body
    const imageParam = req.query.image

    // const publicId = extractPublicId(
    //     "http://res.cloudinary.com/do9ctd3bd/image/upload/v1702555372/img_furnitures/an1oikxkvyjewj6hvxl0.jpg"
    // ) 
    // .log(publicId);

    try {
        const furnitureOwner = await Furniture.findOne({_id: furnitureId, owner: userId});
    
        if (!furnitureOwner) {
            return res.status(404).json({ success: false, error: 'Produit introuvable' });
        }    
    
        if (furnitureOwner.owner.toString() !== userId) {
            return res.status(403).json({ success: false, error: 'Vous n\'êtes pas autorisé à modifier ce produit' });
        }
    
        // Mettez à jour les propriétés du produit
        if (name) furnitureOwner.name = name;
        if (description) furnitureOwner.description = description;
        if (city) furnitureOwner.city = city;
        if (price_per_day) furnitureOwner.price_per_day = price_per_day;
    
        // Gérez le téléchargement de la nouvelle image si disponible
        if (req.file) {
            cloudinary.uploader.upload_stream({ folder: 'img_furnitures' }, async (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi de la nouvelle image sur Cloudinary' });
                }
    
                const updatedImage = furnitureOwner.images.find(img => img._id.toString() === imageParam.toString());
                updatedImage.url = result.url;
    
                // Sauvegardez toutes les mises à jour du produit
                await furnitureOwner.save();
                res.json({ success: true, message: 'Produit mis à jour avec succès' });
            }).end(req.file.buffer);
        } else {
            // Si aucune image n'est téléchargée, sauvegardez simplement les mises à jour du produit
            await furnitureOwner.save();
            res.json({ success: true, message: 'Produit mis à jour avec succès' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erreur lors de la mise à jour du produit' });
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

