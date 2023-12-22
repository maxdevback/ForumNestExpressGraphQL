import { config } from "dotenv";
import server from "./graphql-yoga/yoga.server";
config();

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
