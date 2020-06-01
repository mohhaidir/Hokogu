"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Favorite extends Model {}
  Favorite.init(
    {
      recipeId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      ready: DataTypes.INTEGER,
      serving: DataTypes.INTEGER,
      image: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    { sequelize }
  );

  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return Favorite;
};
