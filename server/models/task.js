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
      Task.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Task.init({
    title: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,

      validate: {
        isIn: {
          args: [
            ['Backlog', 'Todo', 'On Going', 'Completed']
          ],
          msg: 'Select valid categories!'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};