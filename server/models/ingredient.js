"use strict";
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Ingredient extends Model {}
  Ingredient.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      image: DataTypes.STRING
    },
    { sequelize }
  );

  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return Ingredient;
};
