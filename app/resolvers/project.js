const resolvers = {
    Query: {
      async project(parent, _, { db }) {
        return await db.project.findAll();
      },
      async projectByid(parent, args, { db }) {
        return await db.project.findOne({
          where: {
            id: args.id,
          },
        });
      },
    },
  
    Mutation: {
      async createProject(parent, args, { db }) {
        const projectCreate = await db.project.create({
          created_by: args.created_by,
          title: args.title,
          description: args.description,
        });
        return projectCreate;
      },
  
      async updateProject(parent, args, { db }) {
        const upProject = {
          id: args.id,
          created_by: args.created_by,
          title: args.title,
          description: args.description,
        };
  
        const projectUpdate = await db.project(upProject, {
          where: { id: args.id },
        });
        if (projectUpdate[0]) {
          const project = await db.project.findOne({
            where: { id: args.id },
          });
          return projec;
        } else {
          throw new Error("Updated Not Found");
        }
      },
  
      async deleteProject(parent, args, { db }) {
        const delProject = await db.project.destroy({
          where: { id: args.id },
        });
  
        if (delProject) {
          return {
            message: "Deleted Done",
          };
        } else {
          throw new Error("Project Not Found");
        }
      },
    },
  };
  module.exports = {
    resolvers,
  };