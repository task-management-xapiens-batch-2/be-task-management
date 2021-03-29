const express = require("express");
const port = process.env.PORT || 3000;
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { router: routerIndex } = require("./routes/index");
const { verifyJwt } = require("./common/middleware/auth");
const db = require("./db/models");
const app = express();
const router = express.Router();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization;
    const result = verifyJwt(auth);
    // console.log(result)
    db.payload = {
      result: result,
    };
    return {
      db,
    };
  },
  playground: {
    settings: {
      "editor.theme": "dark",
    },
  },
  introspection: true,
});
server.applyMiddleware({ app });

app.get("/", async (req, res) => {
  return res.json({
    message: "welcome graphql local",
  });
});

app.use("/api", routerIndex);
app.use(router);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
