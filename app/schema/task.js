const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {

    findAllTaskSpv: [Task]
    findAllTaskPlanner: [Task]
    findAllTaskWorker: [Task]
    findTaskReturn: [Task]
    findTaskReject: [Task]

    findOneTaskSpv(id:Int): Task
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
    note: [Note]
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

    buttonStatusDraft(
      project_id: Int
      assignee: Int
      title: String
      description: String
      start_date: String
      due_date: String
    ): Task

    updateTaskReturn(
      id: Int
      project_id: Int
      assignee: Int
      title: String
      description: String
      start_date: String
      due_date: String
    ): Task

    updateTaskDraft(
      id: Int
      project_id: Int
      assignee: Int
      title: String
      description: String
      start_date: String
      due_date: String
    ): Task

    updateStatusTaskAdmin(id: Int, status: String): Task
    updateStatusTaskSpv(id:Int,status: String, note: String): Task
    updateStatusTaskSpvApprove(id:Int,status: String): Task

    updateStatusTaskPlanner(id: Int, status: String): Task
    updateStatusTaskWorker(id: Int, status: String): Task

    updateIsRead(id: Int): Task
    deleteTask(id: Int): Task
  }
`;
module.exports = {
  typeDefs,
};
