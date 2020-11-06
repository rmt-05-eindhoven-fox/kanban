'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Kanbans', {
      type: 'FOREIGN KEY',
      fields: ['UserEmail'],
      name: 'FK_projectType_project', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'email',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Kanbans', ['UserEmail'])
  }
};
