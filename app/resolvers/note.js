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
    async createNote(parent, args, {db}) {
        const noteCreate = await db.note.create({
            task_id: args.task_id,
            note : args.note
        });
        return noteCreate;
    },
    async updateNote(parent, args, {db}) {
        const upNote = {
            id : args.id,
            task_id : args.task_id,
            note: args.note
        };
        const noteUpdate = await db.note(upNote, {
            where : { id: args.id},
        }) 
        if (noteUpdate) {
            const note = await db.note.findOne({
                where : {id:args.id},
            })
            return note
        } else {
            throw new Error("Update Note not Found")
        }
    }
      
  }
};
