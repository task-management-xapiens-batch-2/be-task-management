const note = require("../db/models/note");
const task = require("../db/models/task");

const resolvers = {
  Query: {
    async note(parent, _, { db }) {
      return await db.note.findAll();
    },

    async notebyTask(parent, args, { db }) {
      return await db.note.findOne({
        where: {
          id: args.task.id,
        },
      });
    },
  },

  Mutation : {
      
  }
};
