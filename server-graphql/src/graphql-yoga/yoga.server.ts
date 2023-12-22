import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { usersResolver } from "./users/users.resolver";
import { usersTypeDefs } from "./users/users.type-defs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authResolver } from "./auth/auth.resolver";
import { authTypeDefs } from "./auth/users.type-defs";

const schema = makeExecutableSchema({
  typeDefs: [usersTypeDefs, authTypeDefs],
  resolvers: [usersResolver, authResolver],
});
const yoga = createYoga({
  schema,
});

export default createServer(yoga);
