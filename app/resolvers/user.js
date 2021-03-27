const { Op } = require("sequelize");
const { hashing } = require("./../common/helpers/hashPassword");
const yup = require("yup");

const resolvers = {
  Query: {
    async user(parent, _, { db }) {
      if (db.payload.result.role === "admin") {
        const data = await db.user.findAll();
        // const data = db.payload
        // console.log(data.result.role);
        return data;
      } else {
        throw new Error("Admin only");
      }
    },
    // Bisa di ganti atau di tambah find by email atau username
    async findUser(parent, args, { db }) {
      return await db.user.findOne({
        where: {
          id: args.id,
        },
      });
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
            where:{
              id:args.id
            }
          })
          return dataBaru
        } else {
          throw new Error("Email or username already exists");
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
