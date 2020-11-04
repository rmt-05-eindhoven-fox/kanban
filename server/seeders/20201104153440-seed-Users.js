'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@mail.com",
      password: hashPassword('SecretTunnel123'),
      profile_picture: `https://ui-avatars.com/api/?name=John+Doe&background=random&rounded=true`,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      individualHooks: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
