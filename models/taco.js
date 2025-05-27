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
      Taco.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Taco.init({
    score: DataTypes.INTEGER,
    mult1: DataTypes.INTEGER,
    bonus: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Taco',
    tableName: 'taco',
    timestamps: false
  });
  return Taco;
};