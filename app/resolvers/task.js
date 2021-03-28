const { argsToArgsConfig } = require("graphql/type/definition");

const resolvers = {
  Query: {
    // For supervisor
    async findAllTask(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.task.findAll();
      } else if (db.payload.result.role === "supervisor") {
        return await db.task.findAll({
          include: [
            {
              model: db.user,
              where: { spv_id: db.payload.result.id },
            },
          ],
        });
      } else {
        throw new Error("you are not allowed");
      }
    },

    // Find Task for ADMIN,SPV,Planner,Worker for Detail with Note(For Planner)

    // ADMIN DAN PLANNER IF NYA DIPISAH
    // Task List Planner
    async findAllTaskPlanner(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.task.findAll();
      } else if (db.payload.result.role === "planner") {
        return await db.task.findAll({
          include: [
            {
              model: db.project,
              where: { created_by: db.payload.result.id },
            },
          ],
        });
      } else {
        throw new Error("you are not allowed");
      }
    },
    // Find Task Planner Reject
    // Find Task Planner Return

    async findTaskReturn(parent, _, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.task.findAll();
      } else if (db.payload.result.role === "planner") {
        return await db.task.findAll({
          include: [
            {
              model: db.project,
              where: { created_by: db.payload.result.id },
            },
          ],
          where: {
            status: "Return",
          },
        });
      } else {
        throw new Error("you are not allowed");
      }
    },

    async findTaskReject(parent, _, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.task.findAll();
      } else if (db.payload.result.role === "planner") {
        return await db.task.findAll({
          include: [
            {
              model: db.project,
              where: { created_by: db.payload.result.id },
            },
          ],
          where: {
            status: "Reject",
          },
        });
      } else {
        throw new Error("you are not allowed");
      }
    },
  },

  Mutation: {
    // Kurang planner untuk merubah data reject
    async updateStatusTaskAdmin(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        // All Status
        const newData = {
          status: args.status,
        };
        const data = await db.task.update(newData, {
          where: {
            id: args.id,
          },
        });
        return await db.task.findOne({
          where: {
            id: args.id,
          },
        });
      }
    },

    // Approved , Return, Reject with Note or Without Note
    // Karena di frontEnd wajib memasukan Note jadi nanti di tambahkan create note
    async updateStatusTaskSpv(parent, args, { db }) {
      if (
        db.payload.result.role === "supervisor" ||
        db.payload.result.role === "admin"
      ) {
        const newData = {
          status: args.status,
        };
        const data = await db.task.update(newData, {
          include: [
            {
              model: db.user,
              where: { spv_id: db.payload.result.id },
            },
          ],
          where: {
            id: args.id,
          },
        });
        return await db.task.findOne({
          include: [
            {
              model: db.user,
              where: { spv_id: db.payload.result.id },
            },
          ],
          where: {
            id: args.id,
          },
        });
      } else {
        throw new Error("you are not allowed");
      }
    },

    async updateStatusTaskPlanner(parent, args, { db }) {
      if (
        db.payload.result.role === "planner" ||
        db.payload.result.role === "admin"
      ) {
        // Status Submit
        const dataPlan = await db.task.findAll({
          include: [
            {
              model: db.project,
              where: { created_by: db.payload.result.id },
            },
          ],
        });
        if (dataPlan[0] !== undefined) {
          const newData = {
            status: args.status,
          };
          const dataWorker = await db.task.update(newData, {
            include: [
              {
                model: db.project,
                where: { created_by: db.payload.result.id },
              },
            ],
          });
          return await db.task.findOne({
            include: [
              {
                model: db.project,
                where: { created_by: db.payload.result.id },
              },
            ],
          });
        } else {
          throw new Error("data doesn't exist");
        }
      } else {
        throw new Error("you are not allowed");
      }
    },

    async updateStatusTaskWorker(parent, args, { db }) {
      if (condition) {
      }
      // Status Todo Doing Done
      const findData = await db.task.findAll({
        where: {
          assignee: db.payload.result.id,
        },
      });
      if (finddata[0] !== undefined) {
        const newData = {
          status: args.status,
        };
        const dataWorker = await db.task.update(newData, {
          where: {
            assignee: args.id,
          },
        });
        return await db.task.findOne({
          where: {
            assignee: args.id,
          },
        });
      }
    },

    // planner membuat task
    async createTask(parent, args, { db }) {
      if (
        db.payload.result.role === "admin" ||
        db.payload.result.role === "planner"
      ) {
        const data = await db.task.create({
          project_id: args.project_id,
          assignee: args.assignee,
          title: args.title,
          description: args.description,
          start_date: args.start_date,
          due_date: args.due_date,
          attachment: "",
          status: "Submit",
          is_read: false,
        });
        return data;
      } else {
        throw new Error("you are not allowed");
      }
    },

    async buttonStatusDraft(parent, args, { db }) {
      if (
        db.payload.result.role === "admin" ||
        db.payload.result.role === "planner"
      ) {
        const data = await db.task.create({
          project_id: args.project_id,
          assignee: args.assignee,
          title: args.title,
          description: args.description,
          start_date: args.start_date,
          due_date: args.due_date,
          attachment: "",
          status: "Submit",
          is_read: false,
        });
        return data;
      } else {
        throw new Error("you are not allowed");
      }
    },

    // Update Task (Return) or masih status draft
    // Dan ketika di kirim ulang statusnya berubah menjadi submit (Kirim Ulang)
    async updateTaskReturn(parent, args, { db }) {
      if (
        db.payload.result.role === "admin" ||
        db.payload.result.role === "planner"
      ) {
        const newData = {
          project_id: args.project_id,
          assignee: args.assignee,
          title: args.title,
          description: args.description,
          start_date: args.start_date,
          due_date: args.due_date,
          status: "Submit",
        };
        const data = await db.task.update(newData, {
          where: {
            id: args.id,
            status: "Return",
          },
          include: [
            {
              model: db.project,
              where: { created_by: db.payload.result.id },
            },
          ],
        });
      } else {
        throw new Error("you are not allowed");
      }
    },

    async updateTaskDraft(parent, args, { db }) {
      if (
        db.payload.result.role === "admin" ||
        db.payload.result.role === "planner"
      ) {
        const newData = {
          project_id: args.project_id,
          assignee: args.assignee,
          title: args.title,
          description: args.description,
          start_date: args.start_date,
          due_date: args.due_date,
          status: "Submit",
        };
        const data = await db.task.update(newData, {
          where: {
            id: args.id,
            status: "Draft",
          },
          include: [
            {
              model: db.project,
              where: { created_by: db.payload.result.id },
            },
          ],
        });
      } else {
        throw new Error("you are not allowed");
      }
    },

    async updateIsRead(parent, args, { db }) {
      if (db.payload.result.role === "worker") {
        const newdata = {
          is_read: true,
        };
        await db.task.update(newdata, {
          where: {
            id: args.id,
          },
        });
      } else {
        throw new Error("you are not allowed");
      }
    },
  },
};
module.exports = {
  resolvers,
};
