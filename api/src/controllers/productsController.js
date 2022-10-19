const { Product } = require('../db.js');
const { Op } = require("sequelize");

const getProducts = async (req, res) => {
    const pageNumber = Number.parseInt(req.query.page);
    const sizeNumber = Number.parseInt(req.query.size);
    const cat        = req.query.cat //recibo la categoria x query en la variable cat
    const orderPrice = req.query.ordprice; // Se recibe por query el criterio de ordenacion EJ: &ordprice=ASC
    const search     = req.query.search; // en caso de llamar este endpoint para search x query enviar EJ: &search=iPhone
        
    let page  = 0;
    let size  = 12;
    let where = {};
    let order = [["id", "ASC"]];

    if(!Number.isNaN(pageNumber) && pageNumber > 0) page = pageNumber;
    if(!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 12) size = sizeNumber;
    if(cat) where.category=cat;
    if(orderPrice) order = [["price", orderPrice]];
    if(search?.length>0) where.name = {[Op.iLike]: `%${search}%`};

    try{
        const products = await Product.findAndCountAll({
            where,
            order,
            limit: size,
            offset: page * size
        });
        return res.status(200).json({
            totalPages: Math.ceil(products.count / size), 
            products: products.rows
        })
    }catch{
        res.status(404).json({ error: "Product not found" });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if(product) return res.status(200).json(product);
    res.status(404).json({ error: "product ID not found or invalid" });
}

const postProduct = async ( req, res ) => {
 try {
  const { name, image, description, price, category, stock, brand } = req.body; 

  if( !name || !image || !description || !price || !category || !stock || !brand) throw(Error('Invalid inputs'));

  let productData = await Product.findAll({
   where:{
    name: name,
    brand: brand,
    stock: stock
   }
  });

  if(productData.length > 0) throw(Error('Product already in database'));

  let product = await Product.create({ name, image, description, price, category, stock, brand });

  res.status(200).json('Product created successfully');

 } catch (error) {
  res.status(404).json({error: error.message});
 }
}

const deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.destroy({
        where: {
            id
        }
    })
    .then( (data) => res.status(200).json("Product deleted successfully") )
    .catch( (error) => res.status(400).json(error.message) )
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    Product.update({...updateData},{
        where: {
            id
        }
    })
    .then( (data) => res.status(200).json("Product updated successfully") )
    .catch( (error) => res.status(400).json({error: error.message}) )
}


module.exports = {
    getProducts,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct
}