'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.hasMany(models.Category)
      Organization.hasMany(models.User_Organization)
      Organization.hasMany(models.Tag)
      Organization.hasMany(models.Notification)

      Organization.belongsTo(models.User)
    }
  };
  Organization.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};