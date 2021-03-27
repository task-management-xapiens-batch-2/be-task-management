const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: project} = require("./project")
const { resolvers: note} = require ("./note")

const resolvers = lodash.merge(user, project, note);

module.exports = {
  resolvers,
};