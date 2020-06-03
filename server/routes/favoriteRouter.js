const router = require("express").Router();
const FavoriteController = require("../controllers/favoriteController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router
  .get("/", authentication, FavoriteController.getFavorite)
  .get("/most", FavoriteController.getFavoriteMost)
  .post("/", authentication, FavoriteController.addFavorite)
  .delete(
    "/:id",
    authentication,
    authorization,
    FavoriteController.deleteFavorite
  );

module.exports = router;
