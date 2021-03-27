const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    user: [User]
    findUser(id: Int!): User
  }

  type User {
    id: Int
    fullname: String
    username: String
    email: String
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
      id:Int
      fullname: String
      username: String!
      email: String!
      password: String!
      role: String!
      spv_id: Int
    ): User
    deleteUser(id: Int!): User
  }
`;

module.exports = {
  typeDefs,
};
