'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Taco.init({
    bonus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Taco',
    tableName: 'taco',
    timestamps: false
  });
  return Taco;
};