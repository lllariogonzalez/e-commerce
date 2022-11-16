const { Router } = require('express');
const { postImageProductId, deleteImageProductId, getImageProductId } = require('../controllers/imageController');
const login = require("../middlewares/login.js");
const admin = require("../middlewares/admin.js");
const fileUpload = require('../middlewares/fileUpload.js');


const imageRouter = Router();

imageRouter.get('/:id', getImageProductId);

imageRouter.post('/product/:id', login, admin, fileUpload, postImageProductId);

imageRouter.delete('/:id', login, admin, deleteImageProductId);

module.exports = imageRouter;