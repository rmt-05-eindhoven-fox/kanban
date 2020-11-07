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
      Task.belongsTo(models.User, {foreignKey: "UserId"})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Input Title"
        }
      }
      },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Input Category"
    }
  },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Input Description"
    }
  },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};