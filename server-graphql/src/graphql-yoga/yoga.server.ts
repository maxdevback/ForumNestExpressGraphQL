import Express from "express";
import cookie from "cookie-parser";
import { createYoga } from "graphql-yoga";
import { usersResolver } from "./users/users.resolver";
import { usersTypeDefs } from "./users/users.type-defs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authResolver } from "./auth/auth.resolver";
import { authTypeDefs } from "./auth/auth.type-defs";
import { PrismaClient } from "@prisma/client";
import middlewares from "./middlewares";
import { postsTypeDefs } from "./posts/posts.type-defs";
import { PostsResolver } from "./posts/posts.resolver";

const schema = makeExecutableSchema({
  typeDefs: [usersTypeDefs, authTypeDefs, postsTypeDefs],
  resolvers: [usersResolver, authResolver, PostsResolver],
});
const yoga = createYoga({
  schema,
});
const server = Express();
server.use(cookie());
server.use(middlewares);

server.use(yoga);

const prisma: PrismaClient = new PrismaClient();

export { prisma };
export default server;
