'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      organization.hasMany(models.organization_member, { foreignKey: 'organization_id',as:'members'})
    }
  };
  organization.init({
    organization_name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "organization name is required"
        },
        notNull:{
          args: true,
          msg: "organization name is required"
        }
      }
    },
    organization_status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['open', 'close'],
      validate: {
        notEmpty: {
          args: true,
          msg: "organization status is required"
        },
        notNull:{
          args: true,
          msg: "organization status is required"
        },
        isIn:{
          args:[['open', 'close']],
          msg:"organization status should be open or close"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'organization',
  });
  return organization;
};