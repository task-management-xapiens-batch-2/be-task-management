const { gql } = require("apollo-server-express");


const typeDefs = gql`
    extend type Query {
        findAllTask(id:Int)
    }

    type Task{
        id:Int
        project_id:Int
        assignee:Int
        title:String
        description: String
        start_date: String
        due_date: String
        attachment: String
        status: String
        is_read: String
    }

`