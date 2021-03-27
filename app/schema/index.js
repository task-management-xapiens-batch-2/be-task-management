const { gql } = require("apollo-server-express");
const { typeDefs: user } = require("./user");
const { typeDefs: project} = require("./project")
const { typeDefs: note} = require("./note")

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [root, user, project, note];
module.exports = {
  typeDefs,
};
