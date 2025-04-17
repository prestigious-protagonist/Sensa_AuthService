const validator = require("validator")
'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const {SALT} = require('../config/serverConfig')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: models.user_roles, // Explicit model reference
        foreignKey: 'userId'
      });
      
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
      
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrong(value) {
          if (!validator.isStrongPassword(value, {  
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1 })) {
            throw new Error('Password must be at least 8 characters long at least one symbol, lowercase character, uppercase character, number.');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  User.beforeCreate((user) => {
   
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword;
  })
  return User;
};