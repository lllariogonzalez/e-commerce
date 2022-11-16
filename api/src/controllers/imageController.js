const { Image } = require("../db.js");
const { uploadImage, deleteImage } = require('../utils/cloudinary.js');

const getImageProductId = async (req, res)=>{
    const { id } = req.params;
    try {
        const images = await Image.findAll({
            where: {
                ProductId: id
            },
            attributes: ["public_id", "image"]
        });
        res.json(images);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const postImageProductId = async (req, res)=>{
    const { id } = req.params
    const { image } = req.body;
    let imgCloud = {};
    try {
        if(image) {
            let imageUploaded = await uploadImage(image);
            imgCloud.image  = imageUploaded.secure_url;
            imgCloud.public_id = imageUploaded.public_id.split('/')[1];
          }
        const newImage = await Image.create({
            ProductId: id,
            ...imgCloud
        })
        res.json(newImage);
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteImageProductId = async (req, res)=>{
    const { id } = req.params;
    try {
        await Image.destroy({
            where:{
                public_id: id,
            }
        })
        await deleteImage(id);
        res.json("Deleted successfully");
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    postImageProductId,
    deleteImageProductId,
    getImageProductId
}