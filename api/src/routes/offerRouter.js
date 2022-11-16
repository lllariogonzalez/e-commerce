const { Router } = require('express');
const login = require('../middlewares/login.js');
const admin = require('../middlewares/admin.js');
const { getOffers, getOfferById, postOffers, deleteOffers, deleteOfferById, updateOfferById } = require('../controllers/offerController.js');

const offerRouter = Router();

offerRouter.get('/', getOffers);

offerRouter.get('/:id', getOfferById);

offerRouter.post('/', /* login, admin, */ postOffers);

offerRouter.delete('/', /* login, admin, */ deleteOffers);

offerRouter.delete('/:id', /* login, admin, */ deleteOfferById);

offerRouter.put('/:id', /* login, admin, */ updateOfferById);

module.exports = offerRouter;