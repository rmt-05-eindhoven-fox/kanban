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
            foreignKey: 'UserId'
         })
      }
   };
   Task.init({
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Title is required'
            },
            notEmpty: {
               args: true,
               msg: 'Title is required'
            }
         }
      },
      category: DataTypes.STRING,
      description: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Description is required'
            },
            notEmpty: {
               args: true,
               msg: 'Description is required'
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