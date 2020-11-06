'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.OrganizationUser, {foreignKey: 'UserId'})
      User.hasMany(models.UserTask, {foreignKey: 'UserId'})
    }
  };
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashingPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};