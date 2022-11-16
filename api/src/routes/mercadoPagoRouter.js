const { Router } = require("express");
const mercadopago = require("mercadopago");
const { postMercadoPago } = require("../controllers/mercadoPagoController");

const mercadoPagoRouter = Router();

mercadopago.configure({
	access_token: process.env.ACCESS_TOKEN
});

mercadoPagoRouter.post("/", postMercadoPago);

module.exports = mercadoPagoRouter;
