'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kanban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kanban.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  Kanban.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    tag: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kanban',
  });
  return Kanban;
};