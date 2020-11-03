'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword} = require('../helpers/bcrypt')

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
      User.belongsToMany(models.Project, {through: models.UserProject})
    }
  };
  User.init({
    username: {
      uniqe: {
        msg: 'Username is taken, please choose other username'
      },
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email is already registered, please use another email'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Please input a valid email address!'
        }, 
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [6],
          msg: 'Password must contain a minimum of 6 characters!'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};