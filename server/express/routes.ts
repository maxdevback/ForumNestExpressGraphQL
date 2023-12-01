import { Router } from "express";
import usersRouter from "./src/users/users.routes";
import postsRouter from "./src/posts/posts.routes";
import commentsRouter from "./src/comments/comments.routes";
import likesRouter from "./src/likes/likes.routes";
import notificationsRouter from "./src/notifications/notifications.routes";

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/posts", postsRouter);
routes.use("/comments", commentsRouter);
routes.use("/likes", likesRouter);
routes.use("/notifications", notificationsRouter);
routes.all("*", (req, res) => {
  res.status(404).send("This resource doesn't exist");
});

export default routes;
