const router = require("express").Router();
const routerUsers = require("./userRouter");
const routerFavorites = require("./favoriteRouter");

router.use("/users", routerUsers);
router.use("/favorites", routerFavorites);

module.exports = router;
