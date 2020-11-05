'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       User.hasMany(models.Task);
    }
  };
  User.init(
		{
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			email: {
        type: DataTypes.STRING,
        validate: {
          isEmail:{
            args:true,
            msg: 'please fill in the correct email format'
          },
          notEmpty: true
        },
        unique:true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [5],

						msg: "password minimum 5 characters",
					},
				},
			},
      organization: DataTypes.STRING
    },
		{
			sequelize,
			modelName: "User",
		}
	);
  return User;
};