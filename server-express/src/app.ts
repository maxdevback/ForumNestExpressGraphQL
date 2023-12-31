import express from "express";
import { config } from "dotenv";
config();
import { connect } from "mongoose";
import routes from "./routes";
import cookieSession from "cookie-session";
import cors from "cors";
import "../types";
const App = express();
App.use(express.json());
App.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
App.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET!],
  })
);
App.use(routes);

const port = process.env.PORT ?? 5000;

App.listen(port, async () => {
  if (!process.env.MONGODB_LINK) throw "Something went wrong with env";
  await connect(process.env.MONGODB_LINK);
  console.log(`The App has been started at ${port} port`);
});
