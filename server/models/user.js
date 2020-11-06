'use strict';
const {
  Model
} = require('sequelize');
const { Bcrypt } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Kanban, { foreignKey: 'UserEmail' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email Can't Be Empty!`
        },
        isEmail: {
          args: true,
          msg: 'Only Allow Email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: false,
          msg: `Password Can't Be Empty!`
        },
        len: {
          args: [7],
          msg: `Password Can't Be Less Than 7 Character!`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = Bcrypt.hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};