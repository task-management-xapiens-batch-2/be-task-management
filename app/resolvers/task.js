const { argsToArgsConfig } = require("graphql/type/definition");

const resolvers = {
  Query: {
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
    // ADMIN DAN PLANNER IF NYA DIPISAH
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
    async updateApproval(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
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
      } else if (db.payload.result.role === "supervisor") {
        const findData = await db.task.findAll({
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
        if (findData[0] !== undefined) {
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
          throw new Error("id does not exist");
        }
      } else if (db.payload.result.role === "worker") {
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
      } else if (db.payload.result.role === "planner") {
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
          throw new Error("data doesn't exist")
        }
      } else {
        throw new Error("you are not allowed");
      }
    },

    async updateIsRead(parent, args, { db }) {
      if (
        db.payload.result.role === "admin" ||
        db.payload.result.role === "worker"
      ) {
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
  },
};
module.exports = {
  resolvers,
};
