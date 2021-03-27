const { argsToArgsConfig } = require("graphql/type/definition");

const resolvers = {
  Query: {
    async findAllTask(parent, args, { db }) {
      const data = await db.task.findAll({
        include: db.user
      });
      // console.log(db.payload.result.id);
      console.log(data);
      return data;
    },
  },
};
module.exports = {
  resolvers,
};