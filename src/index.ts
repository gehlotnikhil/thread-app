import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";
const init = async () => {
  const app = express();

  //create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
        hello:String
        say(name:String):String
    }
    type Mutation{
        createUser(firstName:String!,lastName:String!,email:String!,password:String!) :Boolean
    }
    `,
    resolvers: {
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt:"random_salt"
            },
          });
          return true;
        },
      },
      Query: {
        hello: () => "Hey there, this is from Graphql",
        say: (_, { name }) => `Hey ${name}, How are you ?`,
      },
    },
  });

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
