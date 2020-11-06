'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Tasks", "tag", {
      type: Sequelize.STRING,
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Tasks", "tag")
  }
};
