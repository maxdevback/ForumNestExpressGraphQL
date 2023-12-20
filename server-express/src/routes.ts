import { Router } from "express";
import usersRouter from "./users/users.routes";
import authRouter from "./auth/auth.routes";
import postsRouter from "./posts/posts.routes";
import commentsRouter from "./comments/comments.routes";
import likesRouter from "./likes/likes.routes";
import notificationsRouter from "./notifications/notifications.routes";

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/auth", authRouter);
routes.use("/posts", postsRouter);
routes.use("/comments", commentsRouter);
routes.use("/likes", likesRouter);
routes.use("/notifications", notificationsRouter);
routes.all("*", (req, res) => {
  res.status(404).send("This resource doesn't exist");
});

export default routes;
