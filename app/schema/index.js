const { gql } = require("apollo-server-express");
const { typeDefs: user } = require("./user");
const { typeDefs: task } = require("./task");

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, task];
module.exports = {
  typeDefs,
};
