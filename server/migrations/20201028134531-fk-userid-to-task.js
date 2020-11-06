'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return [
        queryInterface.addColumn('tasks', 'creator_id', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }),
        queryInterface.addColumn('tasks', 'organization_id', {
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
          queryInterface.removeColumn('tasks', 'creator_id'),
          queryInterface.removeColumn('tasks', 'organization_id')
      ];
  }
};
