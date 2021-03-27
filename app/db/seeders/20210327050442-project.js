"use strict";
const faker = require("faker");
const project = [...Array(3)].map((e)=>{
  return {
    created_by:2,
    title: faker.lorem.text(),
    description: faker.lorem.sentence(),
    is_complete: false,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert("projects", project)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
