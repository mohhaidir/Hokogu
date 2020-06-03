const router = require("express").Router();
const ingredientController = require("../controllers/ingredientController");
const authentication = require("../middlewares/authentication");

router
  .get("/", authentication, ingredientController.getIngredientById)
  .post("/", authentication, ingredientController.addIngredient)
  .put("/:id", authentication, ingredientController.editIngredient)
  .delete("/bulk", authentication, ingredientController.bulkDeleteIngredient)
  .delete("/:id", authentication, ingredientController.deleteIngredient);

module.exports = router;
