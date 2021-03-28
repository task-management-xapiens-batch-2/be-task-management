const { gql } = require("apollo-server-express");
const typeDefs = gql`
    extend type Query {
        findAllNote : [Note]
        noteByTask : Note
    }

    type Note {
        id : Int
        task_id : Int
        note : String
    }

    extend type Mutation {
        createNote (
            task_id : Int
            note : String
        ):Note

        updateNote (
            id: Int!
            task_id : Int
            note : String
        ):Note

        deleteNote (id: Int!) :Note
    }
`;

module.exports = {
    typeDefs,
}