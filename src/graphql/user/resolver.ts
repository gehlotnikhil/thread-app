import {prismaClient} from "../../lib/db"
const Query = {
    hello: () => "Hey there, this is from Graphql",
    say: (_:any, { name }:{name:string}) => `Hey ${name}, How are you ?`,
  }

  const Mutationn= {
    createUser: async (
      _:any,
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
          salt: "random_salt",
        },
      });
      return true;
    },
  }
export const resolver = {Query,Mutationn}