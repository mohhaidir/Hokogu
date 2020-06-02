const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router
  .get("/:id", authentication, UserController.getUser)
  .post("/register", UserController.registerUser)
  .post("/login", UserController.loginUser)
  .post("/googlelogin", UserController.googleLogin)
  .put("/:id", authentication, UserController.editUser)

module.exports = router;
