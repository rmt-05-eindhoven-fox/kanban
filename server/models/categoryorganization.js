'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryOrganization.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      CategoryOrganization.belongsTo(models.User, { foreignKey: 'UserId' })
      CategoryOrganization.belongsTo(models.Organization, { foreignKey: 'OrganizationId' })
    }
  };
  CategoryOrganization.init({
    UserId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryOrganization',
  });
  return CategoryOrganization;
};