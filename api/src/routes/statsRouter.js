const { Router } = require('express');
const login = require('../middlewares/login.js');
const admin = require('../middlewares/admin.js');
const { getStatsCategories, getFiveProductsLowStock, getOrderTotalPaymentMonthly, getCountUserMonthly } = require('../controllers/statsController.js');

const statsRouter = Router();

statsRouter.get('/categories', login, admin, getStatsCategories);

statsRouter.get('/stock', login, admin, getFiveProductsLowStock);

statsRouter.get('/order', login, admin, getOrderTotalPaymentMonthly);

statsRouter.get('/user', login, admin, getCountUserMonthly);

module.exports = statsRouter;