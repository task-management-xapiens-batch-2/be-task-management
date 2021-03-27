"use strict";
const faker = require("faker");

const tasks = [...Array(2)].map((e) => {
  return {
    assignee: 5,
    project_id:3,
    title: faker.lorem.text(),
    description: faker.lorem.lines(),
    start_date: faker.date.recent(),
    due_date: faker.date.soon(),
    attachment: faker.internet.url(),
    status: "submit",
    is_read: false,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("tasks", tasks)
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
