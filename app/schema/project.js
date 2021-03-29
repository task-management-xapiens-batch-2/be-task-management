const { gql } = require("apollo-server-express");
const typeDefs = gql`
  extend type Query {
    findAllproject: [Project]
    findOneProjectById(id : Int!) : Project
    projectByUserId: [Project]
  }

  type Project {
    id: Int
    created_by: Int
    title: String
    description: String
  }

  extend type Mutation {
    createProject(title: String, description: String): Project

    updateProject(
      id: Int!
      title: String
      description: String
    ): Project

    deleteProject(id: Int!): Project
  }
`;
module.exports = {
  typeDefs,
};
