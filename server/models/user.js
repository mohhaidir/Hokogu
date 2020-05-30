"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validation: {
          notEmpty: {
            message: "Name is required and cannot be empty!"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validation: {
          notEmpty: {
            message: "Email is required and cannot be empty!"
          },
          isEmail: {
            message: "Invalid email format!"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validation: {
          notEmpty: {
            message: "Password is required and cannot be empty!"
          },
          len: {
            args: [6, 12],
            message: "Password length required between 6 to 12!"
          }
        }
      },
      avatar: {
        type: DataTypes.STRING,
        isUrl: true
      }
    },
    {
      hooks: {
        beforeCreate: (instance, option) => {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        }
      },
      sequelize
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Favorite, { foreignKey: "UserId" });
  };
  return User;
};
