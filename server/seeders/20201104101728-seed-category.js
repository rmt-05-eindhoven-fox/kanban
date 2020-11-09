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

    await queryInterface.bulkInsert('Categories', [
      {name: 'Backlog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'To Do', createdAt: new Date(), updatedAt: new Date()},
      {name: 'On Progress', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Completed', createdAt: new Date(), updatedAt: new Date()}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
