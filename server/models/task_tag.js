'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task_Tag.belongsTo(models.Task)
      Task_Tag.belongsTo(models.Tag)
    }
  };
  Task_Tag.init({
    TaskId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task_Tag',
  });
  return Task_Tag;
};