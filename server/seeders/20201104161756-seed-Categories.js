'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Backlog',
        type: 'Default',
        OrganizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Todo',
        type: 'Default',
        OrganizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Doing',
        type: 'Default',
        OrganizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Done',
        type: 'Default',
        OrganizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
