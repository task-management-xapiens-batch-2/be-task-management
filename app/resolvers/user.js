const { Op } = require("sequelize");
const { hashing } = require("./../common/helpers/hashPassword");
const yup = require("yup");

const resolvers = {
  Query: {
    // Find All User
    // Find All User for SPV
    // Find All User for Planner

    async findAllUserAdmin(parent, _, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.user.findAll();
      } else {
        throw new Error("Admin only");
      }
    },

    async findAllUserSpv(parent, _, { db }) {
      if (db.payload.result.role === "supervisor") {
        return await db.user.findAll({
          where: {
            [Op.and]: [
              { spv_id: db.payload.result.id },
              { role: ["planner", "worker"] },
            ],
          },
        });
      } else {
        throw new Error("You are not allowed to access this page");
      }
    },

    async findAllUserPlanner(parent, _, { db }) {
      if (db.payload.result.role === "planner") {
        // console.log(db.payload.result.spv_id);
        return await db.user.findAll({
          where: {
            [Op.and]: [
              { spv_id: db.payload.result.spv_id },
              { role: "worker" },
            ],
          },
        });
      } else {
        throw new Error("You are not allowed to access this page");
      }
    },

    // Bisa di ganti atau di tambah find by email atau username
    async findUserAdmin(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        return await db.user.findOne({
          where: {
            id: args.id,
          },
        });
      } else {
        throw new Error("admin only");
      }
    },

    async findUserSpv(parent, args, { db }) {
      if (db.payload.result.role === "supervisor") {
        return await db.user.findOne({
          where: {
            [Op.and]: [
              { spv_id: db.payload.result.id },
              { role: ["planner", "worker"] },
              { id: args.id },
            ],
          },
        });
      } else {
        throw new Error("You are not allowed to access this page");
      }
    },

    async findUserPlanner(parent, args, { db }) {
      if (db.payload.result.role === "planner") {
        return await db.user.findOne({
          where: {
            [Op.and]: [
              { spv_id: db.payload.result.spv_id },
              { role: "worker" },
              { id: args.id },
            ],
          },
        });
      } else {
        throw new Error("You are not allowed to access this page");
      }
    },
  },

  Mutation: {
    async registerUser(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        const data = await db.user.findAll({
          where: {
            [Op.or]: [{ username: args.username }, { email: args.email }],
          },
        });
        if (data[0] === undefined) {
          const { salt, hash } = hashing(args.password);
          const dataCreate = await db.user.create({
            fullname: args.fullname,
            username: args.username,
            email: args.email,
            password: hash,
            salt: salt,
            role: args.role,
            spv_id: args.spv_id,
          });
          return dataCreate;
        } else {
          throw new Error("Email or username already exists");
        }
      } else {
        throw new Error("Admin only");
      }
    },
    async updateUser(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        const { salt, hash } = hashing(args.password);
        const newData = {
          fullname: args.fullname,
          username: args.username,
          email: args.email,
          password: hash,
          salt: salt,
          role: args.role,
          spv_id: args.spv_id,
        };
        const data = await db.user.findAll({
          where: {
            [Op.or]: [{ username: args.username }, { email: args.email }],
          },
        });
        if (data[0] === undefined) {
          const dataCreate = await db.user.update(newData, {
            where: {
              id: args.id,
            },
          });
          // return dataCreate;
          const dataBaru = await db.user.findOne({
            where: {
              id: args.id,
            },
          });
          return dataBaru;
        } else {
          throw new Error("Email or username already exists");
        }
      } else {
        throw new Error("Admin Only");
      }
    },

    async updatePassword(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        const { salt, hash } = hashing(args.password);
        const newData = {
          password: hash,
          salt: salt,
        };
        const data = await db.user.findAll({
          where: {
            id: args.id,
          },
        });
        if (data[0] !== undefined) {
          const dataCreate = await db.user.update(newData, {
            where: {
              id: args.id,
            },
          });
          // return dataCreate;
          const dataBaru = await db.user.findOne({
            where: {
              id: args.id,
            },
          });
          return dataBaru;
        } else {
          throw new Error("Data doesn't exist");
        }
      } else {
        throw new Error("Admin Only");
      }
    },

    async deleteUser(parent, args, { db }) {
      if (db.payload.result.role === "admin") {
        if (db.payload.result.id === args.id) {
          throw new Error("can't delete yourself");
        } else {
          return await db.user.destroy({
            where: {
              id: args.id,
            },
          });
        }
      } else {
        throw new Error("Admin only");
      }
    },
  },
};

module.exports = {
  resolvers,
};
