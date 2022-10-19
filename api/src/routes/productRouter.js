const { Router } = require('express');
const { getProducts, getProductById, postProduct, deleteProduct, updateProduct } = require('../controllers/productsController.js');
const login = require("../middlewares/login.js");
const authorization = require("../middlewares/authorization.js");

const productRouter = Router();

productRouter.get('/', getProducts);

productRouter.get('/:id', getProductById);

productRouter.post('/', login, authorization, postProduct);

productRouter.delete("/:id", login, authorization, deleteProduct);

productRouter.put("/:id", login, authorization, updateProduct);


module.exports = productRouter;