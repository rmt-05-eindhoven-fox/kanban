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
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required"
        },
        notNull: {
          args: true,
          msg: "Username is required"
        },
        isOneWord(value) {
          const words = value.split(' ');
          if (words.length > 1) {
            throw new Error('Username cannot contain space')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        notNull: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Please fill email with correct format (yourmail@mail.com)"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        notNull: {
          args: true,
          msg: "Password is required"
        },
        len: {
          args: [6],
          msg: "Password should be minimum 6 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        if (!user.username) {
          user.username = user.email
        }
      }
    }
  });
  return User;
};