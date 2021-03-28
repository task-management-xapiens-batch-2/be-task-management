const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    findAllTask: [Task]
    findAllTaskPlanner: [Task]
    findTaskReturn: [Task]
    findTaskReject: [Task]
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
  }

  extend type Mutation {
    createTask(
      project_id: Int
      assignee: Int
      title: String
      description: String
      start_date: String
      due_date: String
    ): Task

    updateTask(
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
    ): Task

    updateApproval(id: Int, status: String): Task
    updateIsRead(id: Int, is_read: String): Task

    deleteTask(id: Int): Task
  }
`;
module.exports = {
  typeDefs,
};
