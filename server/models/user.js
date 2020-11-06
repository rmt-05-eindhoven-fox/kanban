'use strict';
const { hashPassword } = require('../helpers/bcrypt')

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
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        },
        async isUnique(value) {
          let user = await User.findOne({
            where: {
              email: value
            }
          })
          if (user) {
            throw new Error('Email already used! Please login')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 40],
          msg: "Password length between 6 and 40"
        },
        notNull: {
          msg: 'Password is required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};