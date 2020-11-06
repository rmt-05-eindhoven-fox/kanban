'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class UserProject extends Model {}
  UserProject.init(
    {
      UserId: DataTypes.INTEGER,
      ProjectId: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    { sequelize }
  )
  UserProject.associate = function(models) {
    // associations can be defined here
    UserProject.belongsTo(models.User)
    UserProject.belongsTo(models.Project)
  }
  return UserProject
}
