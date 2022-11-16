const { User, Category, Product, Order, OrderDetail, db } = require('../db.js');
const { Op, Sequelize } = require('sequelize');

const getStatsCategories = async( req, res )=>{
    try {
        const result = await Product.findAll({
            attributes:[ 
                "CategoryId",
                [db.fn("COUNT", "CategoryId"), "total" ]
            ],
            order: [ ["CategoryId", "ASC"] ],
            group: ["CategoryId"]   
        });
        const name = await Category.findAll()
        result.map(r=>{
            return r.dataValues.category = name.find(n=>n.id===r.CategoryId)?.category;
        });
        res.json(result);
        
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error.message);
    }
}

const getFiveProductsLowStock = async (req, res)=>{
    try {
        const products = await Product.findAll({
            where:{
                stock: {
                    [Op.lt]: 10
                }
            },
            order: [["stock", "ASC"]],
            limit: 5
        })
        res.json(products);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const getOrderTotalPaymentMonthly = async (req, res)=>{
    let data = [];
    try {
        const orders = await Order.findAll();
        data = orders.map(o=>{
            return {
                total: o.total_payment,
                day: o.createdAt
            }
        })
        res.json(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const getCountUserMonthly = async (req, res)=>{
    let data = [];
    try {
        const users = await User.findAll();
        data = users.map(u=>{
            return {
                day: u.createdAt
            }
        })
        res.json(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    getStatsCategories,
    getFiveProductsLowStock,
    getOrderTotalPaymentMonthly,
    getCountUserMonthly
}