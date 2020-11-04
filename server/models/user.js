"use strict";
const { Model } = require("sequelize");
const Helper = require("../helper/helper");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please input title",
          },
          isEmail: {
            args: true,
            msg: "Please input a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please input title",
          },
          isPassword(value) {
            let isContainNumber = false;
            let numbers = "123456789".split("");
            value.split("").forEach((eachValue) => {
              numbers.forEach((eachNumber) => {
                if (eachValue === eachNumber) isContainNumber = true;
              });
            });
            if (!isContainNumber)
              throw new Error("Password must include numbers!");
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = Helper.hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
