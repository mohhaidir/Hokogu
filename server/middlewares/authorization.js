const { Favorite } = require("../models");

const authorization = function(req, res, next) {
  let id = req.params.id;
  let option = { where: { id } };
  Favorite.findOne(option)
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
        }
      }
      next();
    })
    .catch(err => {
      res.status(500).json({
        message: "Internal server Error"
      });
    });
};

module.exports = authorization;
