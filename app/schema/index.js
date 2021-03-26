const { gql } = require("apollo-server-express");
const { typeDefs: user } = require("./user");

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user];
module.exports = {
  typeDefs,
};
