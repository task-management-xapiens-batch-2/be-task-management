const express = require("express");
const port = process.env.PORT || 3000;
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const cors = require("cors");
var cors_proxy = require("cors-anywhere");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { router: routerIndex } = require("./routes/index");
const { verifyJwt } = require("./common/middleware/auth");
const db = require("./db/models");
const app = express();
const router = express.Router();

app.use(express.json());

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization;
    if (!auth) throw new AuthenticationError("you must be logged in");
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

app.patch(
  "/upload/attachment/:id",
  uploadAttachment.single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const newData = {
        attachment: result.url,
      };
      const data = await db.task.update(newData, {
        where: {
          id: req.params.id,
        },
      });
      if (data) {
        res.json({ message: "berhasil" });
      }
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }
);

app.use("/api", routerIndex);
app.use(router);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
