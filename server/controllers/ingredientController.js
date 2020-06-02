const { Ingredient } = require("../models");

class IngredientController {
  static getIngredientById(req, res) {
    const { id } = req.userdata.id;

    Ingredient.findAll({ where: { UserId: id } })
      .then(result => {
        if (result) {
          res.status(200).json({
            message: "Success retrieve ingredient",
            ingredients: result
          });
        } else if (result.length === 0) {
          res.status(404).json({ message: "Ingredient not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Internal server error" });
      });
  }

  static addIngredient(req, res) {
    const { title, type, status } = req.body;
    const UserId = req.userdata.id;

    Ingredient.findOne({
      where: {
        [Op.and]: [{ title: title }, { UserId: req.userdata.id }]
      }
    })
      .then(matched => {
        if (matched) {
          throw new Error({
            status: 400,
            message: "This is already in your ingredient"
          });
        } else {
          return Ingredient.create({ title, type, status, UserId });
        }
      })
      .then(response => {
        if (response) {
          res.status(201).json({
            message: "Success added a new ingredient",
            ingredients: response
          });
        }
      })
      .catch(err => {
        if (err.message) {
          res
            .status(400)
            .json({ message: "This is already in your ingredient" });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      });
  }

  static editIngredient(req, res) {
    const id = Number(req.params.id);
    const { title, type, status } = req.body;
    const obj = {
      title,
      type,
      status
    };

    Ingredient.findOne({ where: { id } })
      .then(result => {
        if (!result) {
          res.status(404).json({ message: "Ingredient not found" });
        } else {
          return Ingredient.update(obj, { where: { id } });
        }
      })
      .then(response => {
        res
          .status(200)
          .json({ message: "Success edited ingredient", editedData: obj });
      })
      .catch(err => {
        res.status(500).json({ message: "Internal server error" });
      });
  }

  static deleteIngredient(req, res) {
    const id = Number(req.params.id);

    Ingredient.findOne({ where: { id } })
      .then(result => {
        if (result) {
          res.status(404).json({ message: "Ingredient not found" });
        } else {
          return Ingredient.destroy({ where: { id } });
        }
      })
      .then(response => {
        res.status(200).json({ message: "Success deleted ingredient" });
      })
      .catch(err => {
        res.status(500).json({ message: "Internal server error" });
      });
  }
}

module.exports = IngredientController;
