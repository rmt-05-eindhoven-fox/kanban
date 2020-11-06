'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organization_member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      organization_member.belongsTo(models.user, { foreignKey: 'user_id'})
    }
  };
  organization_member.init({
    member_status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'organization_member',
  });
  return organization_member;
};