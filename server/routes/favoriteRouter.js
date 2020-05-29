const router = require("express").Router();
const UserController = require("../controllers/favoriteController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router
  .get("/", authentication, UserController.getFavorite)
  .get("/most", UserController.getFavoriteMost)
  .post("/", authentication, UserController.addFavorite)
  .delete("/:id", authentication, authorization, UserController.deleteFavorite);

module.exports = router;
