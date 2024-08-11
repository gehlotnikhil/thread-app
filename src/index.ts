import express from "express";
import { ApolloServer } from "@apollo/server";
import { gqlServer } from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
const init = async () => {
  const app = express();


  await gqlServer.start();
  app.use(express.json());
  app.use("/graphql", expressMiddleware(gqlServer));

  app.get("/", (req, res) => {
    res.send({ message: "Server is up and running" });
  });

  app.listen(8000, () => {
    console.log("Server running at port 8000");
  });
};
init();
