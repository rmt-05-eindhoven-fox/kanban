'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: "Must be email format!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isPasswordFormat(value){
          if (!value.length > 6){
            throw new Error("Minimum 6 character password")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate (int, opt) {
        int.password = hashPassword(int.password)
      }
    }
  });
  return User;
};