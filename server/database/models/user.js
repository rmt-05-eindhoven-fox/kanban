'use strict';
const {
   Model
} = require('sequelize');

const {hashPassword} = require('../../helpers/hash')

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         User.hasMany(models.Task, {
            foreignKey: 'UserId'
         })
         User.hasMany(models.GroupUser, {
            foreignKey: 'UserId'
         })
      }
   };
   User.init({
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Username is required'
            },
            notEmpty: {
               args: true,
               msg: 'Username is required'
            }
         }
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            isEmail: {
               args: true,
               msg: "Not a valid email"
            },
            notEmpty: {
               args: true,
               msg: 'Email is requiredy'
            },
            notNull: {
               args: true,
               msg: 'Email is required'
            },
         },
         unique: {
            args: true,
            msg: 'Email already in use'
         },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Password is required'
            },
            notEmpty: {
               args: true,
               msg: 'Password is required'
            }
         }
      },
   }, {
      sequelize,
      modelName: 'User',
   });
   User.beforeCreate((instace, option) =>{
      instace.password = hashPassword(instace.password)
   })
   return User;
};