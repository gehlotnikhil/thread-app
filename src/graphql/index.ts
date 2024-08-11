import {ApolloServer} from "@apollo/server"
import { prismaClient } from "../lib/db";
import { User } from "./user";
//create graphql server
export const gqlServer = new ApolloServer({
  typeDefs: `
  ${User.typedef}
   ${User.queries}
   ${User.mutation}
    `,
  resolvers: {
    Mutation: User.resolver.Mutationn,
    Query: User.resolver.Query,
  },
});
