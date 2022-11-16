const { Router } = require("express");
const {
  getFavorites,
  postFavorites,
  deleteFavorites
} = require("../controllers/favsController.js");
const login = require("../middlewares/login.js");

const favRouter = Router();

favRouter.get("/", login, getFavorites);
favRouter.post("/", login, postFavorites);
favRouter.delete('/', login, deleteFavorites);

module.exports = favRouter;
