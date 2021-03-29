"use strict";
const { hashing } = require("./../../common/helpers/hashPassword");
const passwordd = "password";
const { salt, hash } = hashing(passwordd);
const faker = require('faker')

const data = [...Array(1)].map((e) => {
  return {
    fullname: "Admin",
    username: "admin",
    email: "admin@gmail.com",
    password: hash,
    salt: salt,
    role: "admin",
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert("users", data);
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
