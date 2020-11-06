'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrganizationUser.belongsTo(models.Organization, {foreignKey: 'OrganizationId'})
      OrganizationUser.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  OrganizationUser.init({
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrganizationUser',
  });
  return OrganizationUser;
};