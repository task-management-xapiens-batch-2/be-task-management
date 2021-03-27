const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllTask: [Task]
  }

  type Task {
    id: Int
    project_id: Int
    assignee: Int
    title: String
    description: String
    start_date: String
    due_date: String
    attachment: String
    status: String
    is_read: String
    user: User
  }

  extend type Mutation {
    updateApproval(id: Int, status: String): Task
    updateIsRead(id:Int,is_read:String): Task

    
  }
`;
module.exports = {
  typeDefs,
};
