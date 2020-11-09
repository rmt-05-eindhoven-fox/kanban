"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User);
      Task.belongsTo(models.Category);
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Title cannot be empty",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Title cannot be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "description cannot be empty",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "description cannot be empty",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Category cannot be empty",
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
