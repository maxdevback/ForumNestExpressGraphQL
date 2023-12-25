import express from "express";
import { config } from "dotenv";

config();
import "../types";

import { connect } from "mongoose";

import routes from "./routes";
import middlewares from "./middlewares";
import { GlobalMiddlewares } from "./global.middlewares";

const app = express();

app.use(express.json());
app.use(middlewares);
app.use(routes);
app.use(GlobalMiddlewares.errorHandler);
const port = process.env.PORT ?? 5000;

app.listen(port, async () => {
  if (!process.env.MONGODB_LINK) throw "Something went wrong with env";
  await connect(process.env.MONGODB_LINK);
  console.log(`The App has been started at ${port} port`);
});
