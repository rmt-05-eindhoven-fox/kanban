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
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Title cannot be empty'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'          
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Category cannot be empty'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};