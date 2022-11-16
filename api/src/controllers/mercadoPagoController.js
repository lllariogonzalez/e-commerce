const mercadopago = require("mercadopago"); 
const { Product } = require("../db");

const { REACT_APP } = process.env;

const postMercadoPago = (req, res) => {
  const { totalProducts, id } = req.body
  let preference = {
    "items": totalProducts.map((product) => {

      return({
        title: product.name,
        unit_price: product.Offer?.active === "true" ? Math.trunc(product.price*(1-product.Offer.discount/100)) : Number(product.price),
        quantity: Number(product.qty),
        picture_url: product.image
      })
    }),
    "back_urls": {
      "success": `${REACT_APP}/?id=${id}`,
      "failure": `${REACT_APP}/?id=${id}`,
      "pending": `${REACT_APP}/?id=${id}`
    }
  };

  totalProducts.map(async p => {
   await Product.increment({stock: -p.qty}, {where:{ name: p.name }});
   })  
   

  mercadopago.preferences
  .create(preference)
    .then(function (response) {
      res.send(response.body.init_point)
      //res.redirect({response.body.id})
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json(error.message);
    });

};

module.exports = {
    postMercadoPago
}