// const { argsToArgsConfig } = require("graphql/type/definition");
// const { sumBy } = require("lodash");

const resolvers = {
  Query: {
    // For supervisor
    async findAllTaskSpv(parent, args, { db }) {
      try {
        if (db.payload.result.role === "admin") {
          return await db.task.findAll();
        } else if (db.payload.result.role === "supervisor") {
          return await db.task.findAll({
            where: {
              status: ["Submit", "Approved", "Return", "Reject"],
            },
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
      } catch (error) {
        throw new Error(error);
      }
    },

    async findOneTaskSpv(parent, args, { db }) {
      try {
        if (db.payload.result.role === "supervisor") {
          return await db.task.findOne({
            where: {
              status: ["Submit", "Approved", "Return", "Reject"],
            },
            include: [
              {
                model: db.user,
                where: { spv_id: db.payload.result.id },
              },
              {
                model: db.note,
              },
            ],
            where: {
              id: args.id,
            },
          });
        } else {
          throw new Error("you are not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    // Find Task for ADMIN,SPV,Planner,Worker for Detail with Note(For Planner)

    // ADMIN DAN PLANNER IF NYA DIPISAH
    // Task List Planner
    async findAllTaskPlanner(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error(error);
      }
    },

    async findAllTaskWorker(parent, _, { db }) {
      try {
        if (db.payload.result.role === "admin") {
          return await db.task.findAll();
        } else if (db.payload.result.role === "worker") {
          return await db.task.findAll({
            where: {
              assignee: db.payload.result.id,
              status: ["Approved", "Todo", "Doing", "Done"],
            },
          });
        } else {
          throw new Error("you are not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async findTaskReturn(parent, _, { db }) {
      try {
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
      } catch (error) {
        throw new Error(error);
      }
    },

    async findTaskReject(parent, _, { db }) {
      try {
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
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    // Kurang planner untuk merubah data reject
    async updateStatusTaskAdmin(parent, args, { db }) {
      try {
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
        } else {
          throw new Error("you are not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    // Update Status Spv With Note
    async updateStatusTaskSpv(parent, args, { db }) {
      try {
        if (
          db.payload.result.role === "supervisor" ||
          db.payload.result.role === "admin"
        ) {
          const newStatus = {
            status: args.status,
          };
          const dataTask = await db.task.findOne({
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

          const data = await db.task.update(newStatus, {
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
          // console.log(dataTask.dataValues.id);
          const dataNote = await db.note.create({
            task_id: dataTask.dataValues.id,
            note: args.note,
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
      } catch (error) {
        throw new Error(error);
      }
    },

    // Update Status Spv Without Note
    async updateStatusTaskSpvApprove(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error(error);
      }
    },

    // Update Status Task Planner
    async updateStatusTaskPlanner(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error(error);
      }
    },

    // Update Status Task Worker
    async updateStatusTaskWorker(parent, args, { db }) {
      try {
        if (
          db.payload.result.role === "worker" ||
          db.payload.result.role === "admin"
        ) {
          // Status Todo Doing Done
          const findData = await db.task.findAll({
            where: {
              assignee: db.payload.result.id,
            },
          });
          if (findData[0] !== undefined) {
            const newData = {
              status: args.status,
            };
            const dataWorker = await db.task.update(newData, {
              where: {
                id: args.id,
              },
            });
            return await db.task.findOne({
              where: {
                assignee: args.id,
              },
            });
          }
        } else {
          throw new Error("you are not allowed");
        }
      } catch (error) {
        throw new Error("you are not allowed");
      }
    },

    // Planner membuat Task baru
    async createTask(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error("you are not allowed");
      }
    },

    // Planner Task status to Draft
    async buttonStatusDraft(parent, args, { db }) {
      try {
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
            status: "Draft",
            is_read: false,
          });
          return data;
        } else {
          throw new Error("you are not allowed");
        }
      } catch (error) {
        throw new Error("you are not allowed");
      }
    },

    async updateTaskReturn(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error("you are not allowed");
      }
    },

    async updateTaskDraft(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error("you are not allowed");
      }
    },

    async updateIsRead(parent, args, { db }) {
      try {
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
      } catch (error) {
        throw new Error("you are not allowed");
      }
    },

    async deleteTask(parent, args, { db }) {
      try {
        if (
          db.payload.result.role === "planner" ||
          db.payload.result.role === "admin"
        ) {
          return await db.task.destroy({
            where: {
              id: args.id,
            },
          });
        } else {
          throw new Error("you are not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
module.exports = {
  resolvers,
};
