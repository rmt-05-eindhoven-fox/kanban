'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User)
      Notification.belongsTo(models.Organization)
      Notification.belongsTo(models.Task)
    }
  };
  Notification.init({
    assigner: DataTypes.STRING,
    type: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};