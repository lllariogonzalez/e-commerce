const { Product, User, Fav, Offer } = require('../db.js');


const getFavorites = async (req, res) => {
    const { email } = req.query;        
       
    if (email) { 
        try {
         const user = await User.findOne({where:{email}, attributes:['id']});  
         
         const favs = await Fav.findAll({
          where:{ UserId: user.id
           },
           attributes:['ProductId']
        });

        const favsDB = favs.map(e => e.ProductId);
        
        const favProducts = await Product.findAll({
         where: {
            id: favsDB
         },
         attributes: {exclude: ['OfferId']},
         include: Offer
        });                 
                
         return res.status(200).json(favProducts);
        } catch (error) {
            return res.json(error.message);
        }
    } else return res.status(200).json('Email not valid')
}

const postFavorites = async(req,res)=> {
    const { email, favs } = req.body;   
    try {
     const user = await User.findOne({ where: { email } }); 
         

        if (user) {
           favs?.map( async(f)=> {
                let productDB = await Product.findByPk(f);                
                await user.addProduct(productDB);              
           })
            
            return res.status(200).json('Favs added successfully');
        }
        return res.status(200).json('User not found');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteFavorites = async (req,res)=>{
const { email, id } = req.query; //email del usuario y id del producto a sacar de favs

try {
  const user = await User.findOne({ where: { email }, attributes: ["id"] });

  await Fav.destroy({
    where: { 
     UserId: user.id,
     ProductId: Number(id)
    }
  });

  res.status(200).json('Fav deleted successfully');

} catch (error) {
 return res.status(400).json(error.message);
}
}

module.exports = {
    getFavorites,
    postFavorites,
    deleteFavorites
}
