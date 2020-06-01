const { Favorite } = require("../models");
const { Op } = require('sequelize');

const authorization = function(req, res, next) {
  let id = req.params.id;
  Favorite.findOne({ 
    where: {
      [Op.and]: [
        {recipeId: id},
        { UserId : req.userdata.id }
      ]
    }
  })
  .then(data => {
    if (!data) {
      res.status(404).json({
        message: "Favorite not found"
      });
    } else {
      if (data.UserId !== req.userdata.id) {
        res.status(403).json({
          message: "Forbiden access"
        });
      }else{
        next();
      }
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Internal server Error"
    });
  });
};

module.exports = authorization;
