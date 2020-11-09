'use strict';

const { hashPassword } = require("../helpers/bcrypt")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Username cannot be empty'
      },
      unique: {
        args: true,
        msg: 'username already taken'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: 'true',
      msg: 'Email cannot be empty'
      },
      unique: {
        args: true,
        msg: 'Email already used'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg:'Email Format incorrect'
        }        
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'password cannot be empty'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate (instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};