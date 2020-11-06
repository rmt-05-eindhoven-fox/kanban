'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Tasks', [
      { description : 'Seeded task', UserId : 1, CategoryId : 1, createdAt : new Date(), updatedAt : new Date()},
      { description : 'Seeded task 2', UserId : 1, CategoryId : 3, createdAt : new Date(), updatedAt : new Date()},
      { description : 'Seeded task 3', UserId : 1, CategoryId : 2, createdAt : new Date(), updatedAt : new Date()},
      { description : 'Seeded task 4', UserId : 1, CategoryId : 4, createdAt : new Date(), updatedAt : new Date()},
      { description : 'Seeded task 5', UserId : 1, CategoryId : 1, createdAt : new Date(), updatedAt : new Date()},
      { description : 'Seeded task 6', UserId : 1, CategoryId : 1, createdAt : new Date(), updatedAt : new Date()}
    ], {})
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Tasks', null, {})
  }
};
