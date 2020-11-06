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
      Organization.hasMany(models.OrganizationUser, {foreignKey: 'OrganizationId'})
      Organization.hasMany(models.Task)
    }
  };
  Organization.init({
    org_name: DataTypes.STRING,
    org_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};