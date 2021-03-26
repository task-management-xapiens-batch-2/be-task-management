const Op = require('sequelize').Op;

const resolvers = {
  Query:{
    async user(parent, _, { db }) {
      if(db.payload.result.role === "admin"){
        const data = await db.user.findAll();
        // const data = db.payload
        // console.log(data.result.role);
        return data;
      } else {
        throw new Error("Hanya admin")
      }
      },

    // async createSourceEventStream(parent,args,{db}){
      
    // }
  }
}

module.exports = {
    resolvers,
  };