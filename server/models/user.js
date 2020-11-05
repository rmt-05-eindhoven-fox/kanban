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
            msg: "Please fill the email",
          },
          isEmail: {
            args: true,
            msg: "Please input a valid email address",
          },
          isUniqueEmail(value, next) {
            User.findOne({ where: { email: value } }).then((data) => {
              if (!data) next();
              else {
                next("Email already registered");
              }
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please fill the password",
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
              throw new Error("Password must include number!");
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
