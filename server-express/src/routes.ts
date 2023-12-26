import { Router } from "express";

import AuthRouter from "./auth/auth.routes";
import PostsRouter from "./posts/posts.routes";
import CommentsRouter from "./comments/comments.routes";
import LikesRouter from "./likes/likes.routes";
import NotificationsRouter from "./notifications/notifications.routes";
import UsersRouter from "./users/users.routes";

const routes = Router();

UsersRouter(routes);
AuthRouter(routes);
PostsRouter(routes);
CommentsRouter(routes);
LikesRouter(routes);
NotificationsRouter(routes);

routes.all("*", (req, res) => {
  res.status(404).send("This resource doesn't exist");
});

export default routes;
