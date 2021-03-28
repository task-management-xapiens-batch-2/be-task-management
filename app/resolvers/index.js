const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: task } = require("./task");

const resolvers = lodash.merge(user, task);

module.exports = {
  resolvers,
};
