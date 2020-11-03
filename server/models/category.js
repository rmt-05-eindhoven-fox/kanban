'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Organization, { foreignKey: 'OrganizationId' });
      Category.hasMany(models.Task, { foreignKey: 'CategoryId' });
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category name is required, can\'t be empty!'
        },
        notNull: {
          args: true,
          msg: 'Category name is required, can\'t be null!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    OrganizationId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};