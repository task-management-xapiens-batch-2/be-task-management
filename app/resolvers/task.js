const { argsToArgsConfig } = require("graphql/type/definition");

const resolvers = {
  Query: {
    async findAllTask(parent, args, { db }) {
      const data = await db.task.findAll({
        include: [{
          model:db.user,
          where: {spv_id:4}
        }]
      });
      // console.log(data);
      return data;
    },
  },
};
module.exports = {
  resolvers,
};