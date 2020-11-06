'use strict';
const { hashPassword } = require('../helper/bcrypt')
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,                        // allowNull harus di dampingi dengan validate: notEmpty
      validate: {
        notEmpty: {
          arg: true,
          msg: "Name Tidak Boleh Kosong"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: true,
          msg: "Email Tidak Boleh Kosong"
        },
        isEmail: {
          args: true,
          msg: 'Harus Format Email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: "Password minimal 6 karakter"
        },
        notEmpty: {
          args: true,
          msg: "Password Tidak Boleh Kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};