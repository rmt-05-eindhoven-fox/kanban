'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Kanbans', {
      type: 'FOREIGN KEY',
      fields: ['UserId'],
      name: 'FK_projectType_project', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Kanbans', ['UserId'])
  }
};
