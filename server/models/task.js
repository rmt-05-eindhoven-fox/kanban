'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User)
      Task.belongsTo(models.Organization)
      Task.belongsTo(models.Category)

      Task.hasMany(models.Task_Tag)
      Task.hasMany(models.Notification)
      Task.hasMany(models.Assignee)
    }
  };
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    OwnerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};