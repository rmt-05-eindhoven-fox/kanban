'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Organization, { foreignKey: 'UserId' })
      User.hasMany(models.Task, { foreignKey: 'UserId' })
    }
  };
  User.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Fullname is required, can\'t be empty!'
        },
        notNull: {
          args: true,
          msg: 'Fullname is required, can\'t be null!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required, can\'t be empty!'
        },
        notNull: {
          args: true,
          msg: 'Username is required, can\'t be null!'
        }, 
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required, can\'t be empty!'
        },
        notNull: {
          args: true,
          msg: 'Email is required, can\'t be null!'
        },
        isEmail: {
          args: true,
          msg: 'Email must be valid an email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: ' is required, can\'t be empty!'
        },
        notNull: {
          args: true,
          msg: ' is required, can\'t be null!'
        }, len: {
          args: [8],
          msg: 'Password minimal 8 character!'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
      afterCreate(user) {
        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        delete user.dataValues.updatedAt;
      }
    },
    modelName: 'User',
  });
  return User;
};