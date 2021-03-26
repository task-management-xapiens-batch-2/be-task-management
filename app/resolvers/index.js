const lodash = require("lodash");
const { resolvers: user } = require("./user");

const resolvers = lodash.merge(user);

module.exports = {
  resolvers,
};