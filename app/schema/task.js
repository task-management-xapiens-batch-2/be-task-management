const { gql } = require("apollo-server-express");


const typeDefs = gql`
    extend type Query {
        findAllTask(id:Int)
        sc
    }

  
`