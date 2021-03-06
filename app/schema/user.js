const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllUserAdmin: [User]
    findAllUserSpv: [User]
    findAllUserPlanner: [User]

    findUserAdmin(id: Int!): User
    findUserSpv(id: Int!): User
    findUserPlanner(id: Int!): User
  }

  type User {
    id: Int
    fullname: String
    username: String
    email: String
    password: String
    role: String
    spv_id: Int
  }

  extend type Mutation {
    registerUser(
      fullname: String
      username: String!
      email: String!
      password: String!
      role: String!
      spv_id: Int
    ): User

    updateUser(
      id: Int
      fullname: String
      username: String
      email: String
      password: String
      role: String
      spv_id: Int
    ): User

    updatePassword(id: Int, password: String): User
    deleteUser(id: Int!): User
  }
`;

module.exports = {
  typeDefs,
};
