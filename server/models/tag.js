'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsTo(models.Organization)

      Tag.hasMany(models.Task_Tag)
    }
  };
  Tag.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    OrganizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};