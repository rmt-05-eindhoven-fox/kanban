'use strict';
const {
   Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class GroupUser extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         GroupUser.belongsTo(models.Group, {foreignKey: 'GroupId'})
         GroupUser.belongsTo(models.User, {foreignKey: 'UserId'})
      }
   };
   GroupUser.init({
      GroupId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
   }, {
      sequelize,
      modelName: 'GroupUser',
   });
   return GroupUser;
};