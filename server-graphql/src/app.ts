import { config } from "dotenv";
config();

import yogaServer from "./graphql-yoga/yoga.server";

yogaServer.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
