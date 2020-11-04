'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Tasks', {
      fields : [ 'CategoryId' ],
      type : 'foreign key',
      name : 'fk-from-task-to-category',
      references : {
        table : 'Categories',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'cascade'
    })  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Tasks', 'fk-from-task-to-category')

  }
};
