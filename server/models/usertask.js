'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTask.belongsTo(models.User, {foreignKey: 'UserId'})
      UserTask.belongsTo(models.Task, {foreignKey: 'TaskId'})
    }
  };
  UserTask.init({
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};