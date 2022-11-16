const app = require('./src/app.js');
const { db } = require('./src/db.js');
const chargeProducts = require('./src/utils/chargeProducts.js');
const { client } = require('./whatsapp/whatsappBot.js');

db.sync({ force: true })
  .then(()=>{
    chargeProducts();
    console.log("Database sync");
  });

app.listen(process.env.PORT, () => {
console.log(`Server listening at port ${process.env.PORT}`); // eslint-disable-line no-console
//para desactivar el bot solo comentar la siguiente linea

//client.initialize();

});
