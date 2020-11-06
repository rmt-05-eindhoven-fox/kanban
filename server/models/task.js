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
      Task.belongsTo(models.User, { foreignKey: "userId" })
      Task.belongsTo(models.Category)
    }
  };
  Task.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Title cannot be empty!" }
      }
    },
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    CategoryId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Category cannot be empty!" }
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};