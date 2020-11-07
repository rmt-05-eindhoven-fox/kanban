'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'task 1',
        category: "Backlog",
        createdAt: new Date(),
        updatedAt: new Date
      },
      {
        title: 'task 1',
        category: "Todo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'task 1',
        category: "Doing",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'task 1',
        category: "Done",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'task 2',
        category: "Backlog",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'task 3',
        category: "Backlog",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'task ',
        category: "Todo",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});

  }
};
