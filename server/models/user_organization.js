'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Organization.belongsTo(models.User)
      User_Organization.belongsTo(models.Organization)
    }
  };
  User_Organization.init({
    role: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Organization',
  });
  return User_Organization;
};