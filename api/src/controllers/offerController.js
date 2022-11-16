const { Offer, Product } = require('../db.js');

const getOffers = async (req, res)=>{
    try {
        const offers = await Offer.findAll({
            order: [["id", "ASC"]]
        });
        res.json(offers);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const getOfferById = async (req, res)=>{
    const id = req.params;
    try {
        const offer = await Offer.findOne({
            where:{
                id
            }
        });
        res.json(offer);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const postOffers = async (req, res)=>{
    const { CategoryId, brand, offer } = req.body
    try {
        const products = await Product.findAll({
            where:{
                CategoryId,
                brand
            }
        })
        const applyOfferProducts = products.map(p=>p.id)
        const [createdOffer, created] = await Offer.findOrCreate({
            where:{
                ...offer
            }
        });
        await createdOffer.setProducts(applyOfferProducts);
        res.json("Offer successfully published");
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteOffers = async (req, res)=>{
    try {
        await Offer.destroy({
            truncate:{ cascade: true},
        });
        res.json("All offers successfully eliminated")
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteOfferById = async (req, res)=>{
    const {id} = req.params;
    try {
        await Offer.destroy({
            where:{
                id: id
            }
        });
        res.json("Delete successfully");
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const updateOfferById = async (req, res)=>{
    const {id} = req.params;
    const { CategoryId, brand, offer } = req.body;
    try {
        await Offer.update( offer, { where:{ id: id } });
        const of = await Offer.findOne({where:{id: id}})

        const products = await Product.findAll({
          where: {
            CategoryId,
            brand,
          },
        });
        const applyOfferProducts = products.map((p) => p.id);

        await of.setProducts(applyOfferProducts);
        res.json("Update successfully");
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    getOffers,
    getOfferById,
    postOffers,
    deleteOffers,
    deleteOfferById,
    updateOfferById 
}