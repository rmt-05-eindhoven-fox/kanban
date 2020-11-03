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
      // define association here
      Task.belongsTo(models.User)
      Task.belongsTo(models.Project)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: 'Title cannot be empty'
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'Add description'
    },
    status: DataTypes.STRING,
    UserId: DataTypes.STRING,
    CategoryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};