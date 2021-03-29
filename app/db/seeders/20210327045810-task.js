"use strict";
const faker = require("faker");

const tasks = [...Array(4)].map((e) => {
  return {
    assignee: faker.random.number({min:17,max:20}),
    project_id:faker.random.number({min:10,max:12}),
    title: faker.lorem.text(),
    description: faker.lorem.lines(),
    start_date: faker.date.recent(),
    due_date: faker.date.soon(),
    attachment: faker.internet.url(),
    status: "Submit",
    is_read: false,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert("tasks", tasks)
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
