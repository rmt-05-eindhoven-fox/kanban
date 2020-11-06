'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
        name: "Backlog",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Todo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Doing",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Done",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert("Categories", data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {})
  }
};
