'use strict';
const {
  Model
} = require('sequelize');

const {
  encode
} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: {
          args: true,
          msg: 'Fill your valid name!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: 'Email format please'
        }
      }
    },
    password: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = encode(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};