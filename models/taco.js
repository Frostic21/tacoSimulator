'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Taco extends Model {
    static associate(models) {
      Taco.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Taco.init({
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    score: DataTypes.INTEGER,
    mult1: DataTypes.INTEGER,
    bonus: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    workers: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
    },
    restaurants: { 
      type: DataTypes.INTEGER, 
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Taco',
    tableName: 'taco',
    timestamps: false
  });

  return Taco;
};
