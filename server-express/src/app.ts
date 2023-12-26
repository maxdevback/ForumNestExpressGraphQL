import express from "express";
import { config } from "dotenv";
config();

import { GlobalMiddlewares } from "./global.middlewares";
import { secretsConfig } from "./config/config.sectrets";
import { appInfoConfig } from "./config/config.app.info";

import "../types";

import { connect } from "mongoose";

import routes from "./routes";
import middlewares from "./middlewares";

const app = express();

app.use(express.json());
app.use(middlewares);
app.use(routes);
app.use(GlobalMiddlewares.errorHandler);
const port = appInfoConfig.port ?? 5000;

app.listen(port, async () => {
  if (!secretsConfig.mongodbLink) throw "Something went wrong with env";
  await connect(secretsConfig.mongodbLink);
  console.log(`The App has been started at ${port} port`);
});
