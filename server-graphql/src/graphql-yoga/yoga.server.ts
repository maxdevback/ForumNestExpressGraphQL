import Express from "express";
import cookie from "cookie-parser";
import { createYoga } from "graphql-yoga";
import { usersResolver } from "./users/users.resolver";
import { usersTypeDefs } from "./users/users.type-defs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authResolver } from "./auth/auth.resolver";
import { authTypeDefs } from "./auth/auth.type-defs";
import middlewares from "./middlewares";

const schema = makeExecutableSchema({
  typeDefs: [usersTypeDefs, authTypeDefs],
  resolvers: [usersResolver, authResolver],
});
const yoga = createYoga({
  schema,
});
const server = Express();
server.use(cookie());
server.use(middlewares);

server.use(yoga);
export default server;
