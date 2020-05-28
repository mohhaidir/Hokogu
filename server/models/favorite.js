'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    recipeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    ready: DataTypes.INTEGER,
    serving: DataTypes.INTEGER,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, { foreignKey: 'UserId' })
  };
  return Favorite;
};