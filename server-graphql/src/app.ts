import { config } from "dotenv";
import yogaServer from "./graphql-yoga/yoga.server";
config();

yogaServer.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
