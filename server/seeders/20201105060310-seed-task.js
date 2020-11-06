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
    await queryInterface.bulkInsert('Tasks', [
      {
       title: 'Vue Js',
       description: "Hubungkan Client dan Server dengan Vue Js",
       due_date: "2020-11-09" ,
       UserId: 2,
       CategoryId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        title: 'Front End',
        description: "Buat single page index.html pake Bootstrap dan CSS untuk styling",
        due_date: "2020-11-07" ,
        UserId: 1,
        CategoryId: 2,
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
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
