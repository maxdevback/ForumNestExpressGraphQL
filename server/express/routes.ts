import { Router } from "express";
import usersRouter from "./src/users/users.routes";
import postsRouter from "./src/posts/posts.routes";

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/posts", postsRouter);
routes.all("*", (req, res) => {
  res.status(404).send("This resource doesn't exist");
});

export default routes;
