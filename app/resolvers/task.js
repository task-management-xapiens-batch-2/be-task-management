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
  },

  Mutation: {
    async updateApproval(parent, args, { db }) {
      if (
        db.payload.result.role === "admin" &&
        db.payload.result.role === "supervisor"
      ) {
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
      } else {
        throw new Error("you are not allowed");
      }
    },

    async updateIsRead(parent, args, { db }) {
      if (db.payload.result.role === "admin" && db.payload.result.role === "worker") {
        const newdata = {
          is_read: true,
        };
        await db.task.update(newdata,{
          where:{
            id:args.id
          }
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
