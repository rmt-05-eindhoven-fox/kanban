'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('organization_members', 'user_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      }),
      queryInterface.addColumn('organization_members', 'organization_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'organizations',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
      return [
          queryInterface.removeColumn('organization_members', 'user_id'),
          queryInterface.removeColumn('organization_members', 'organization_id')
      ];
  }
};
