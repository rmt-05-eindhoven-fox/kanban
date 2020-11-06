'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('tasks', [{
        title: 'Portofolio 1',
        description: 'Membuat kanban todo',
        status: 'New',
        creator_id:'1',
        organization_id:'1',
        due_date:new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('tasks', null, {});
  }
};
