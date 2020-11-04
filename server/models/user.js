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
      User.hasMany(models.Organization)
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fist name is required"
        },
        notNull: {
          args: true,
          msg: "First name is required"
        },
        isOneWord(value) {
          const words = value.split(' ');
          if (words.length > 1) {
            throw new Error('First name cannot contain space')
          }
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Last name is required"
        },
        notNull: {
          args: true,
          msg: "Last name is required"
        },
        isOneWord(value) {
          const words = value.split(' ');
          if (words.length > 1) {
            throw new Error('Last name cannot contain space')
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
    },
    profile_picture: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        const imgUrl = `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&rounded=true`
        user.profile_picture = imgUrl
      }
    }
  });
  return User;
};