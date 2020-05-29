const router = require("express").Router();
const UserController = require("../controllers/userController");

router
  .post("/register", UserController.registerUser)
  .post("/login", UserController.loginUser)
  .post("/googlelogin", UserController.googleLogin);

module.exports = router;
