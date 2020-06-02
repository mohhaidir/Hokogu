const router = require("express").Router();
const routerUsers = require("./userRouter");
const routerFavorites = require("./favoriteRouter");
const routerIngredients = require("./ingredientRouter");

router.use("/users", routerUsers);
router.use("/favorites", routerFavorites);
router.use("/ingredients", routerIngredients);

module.exports = router;
