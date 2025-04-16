'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_roles.init({
    userId: {
      type:DataTypes.UUID,
      references:{
        model: 'Users',
        key: 'id'
      },
      
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    roleId:{
      type: DataTypes.UUID,
      references:{
        model: 'Roles',
        key: 'id'
      },
      
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'user_roles',
  });
  return user_roles;
};