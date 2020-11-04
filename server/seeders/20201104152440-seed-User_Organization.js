'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User_Organizations', [{
      role: 'Admin',
      UserId: 1,
      OrganizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Organizations', null, {});
  }
};
