'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
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
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Name is required`
        },
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Email is required`
        },
        isEmail : {
          msg : `Invalid email format`
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Password is required`
        }

      }
    }
  }, {
    hooks : {
      beforeCreate : (user, option) => {
        user.password = hashPassword(user.password)
      },
      afterCreate : (user, option) => {
        delete user.password
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};