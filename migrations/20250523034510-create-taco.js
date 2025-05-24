'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taco', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      score: Sequelize.INTEGER,
      bonus: Sequelize.INTEGER,
      update: Sequelize.INTEGER,
      autoUpdate: Sequelize.INTEGER,
      shopRequirement: Sequelize.INTEGER,
      autoUpdate2: Sequelize.INTEGER,
      autobuythingy: Sequelize.INTEGER,
      autoRequirement: Sequelize.INTEGER,
      toppingsRequirement: Sequelize.INTEGER
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taco');
  }
};