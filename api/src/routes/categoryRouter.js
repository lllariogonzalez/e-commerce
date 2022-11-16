const { Router } = require("express");
const login = require("../middlewares/login.js");
const admin = require("../middlewares/admin.js");
const {getCategories, postCategory, updateCategory, deleteCategory } = require('../controllers/categoryController.js');

const categoryRouter = Router();

categoryRouter.get('/', getCategories);

categoryRouter.post('/:category', login, admin, postCategory);

categoryRouter.put('/:id/:category', /* login, admin, */ updateCategory);

categoryRouter.delete('/:id', /* login, admin, */ deleteCategory);

module.exports = categoryRouter;