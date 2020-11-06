'use strict';
const Bcrypt = require('../helpers/bcrypt')
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
      User.belongsToMany(models.Organization, { through: models.UserOrganization })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Not valid email"
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        notNull: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
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
        len: {
          args: [6],
          msg: "Password must be more than 6 character"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(data, opt) {
        data.email = data.email.toLowerCase()
        data.password = Bcrypt.hash(data.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};