const resolvers = {
  Query: {
    async findAllNote(parent, _, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.note.findAll();
      } else {
        throw new Error("Access Denied");
      }
    },

    async noteByTask(parent, args, { db }) {
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        return await db.note.findOne({
          where: {
            id: args.id,
          },
        });
      } else {
        throw new Error("Access Denied");
      }
    },
  },

  Mutation: {
    async createNote(parent, args, { db }) {
      if (db.payload.result.role === "supervisor") {
        const noteCreate = await db.note.create({
          task_id: args.task_id,
          note: args.note,
        });
        return noteCreate;
      } else {
        throw new Error("Access Denied");
      }
    },

    async updateNote(parent, args, { db }) {
      if (db.payload.result.role === "supervisor") {
        const upNote = {
          id: args.id,
          task_id: args.task_id,
          note: args.note,
        };
        const noteUpdate = await db.note(upNote, {
          where: { id: args.id },
        });
        if (noteUpdate) {
          const note = await db.note.findOne({
            where: { id: args.id },
          });
          return note;
        } else {
          throw new Error("Update Note not Found");
        }
      } else {
        throw new Error("Access Denied");
      }
    },

    async deleteNote(parent, args, { db }) {
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        const delNote = await db.note.destroy({
          where: { id: args.id},
        });

        if (delNote) {
          return {
            message: "Deleted Done",
          };
        } else {
          throw new Error("Note Not Found");
        }
      }
    },
  },
};
module.exports = {
  resolvers,
};
