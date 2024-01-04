import { Router } from 'express';

import appendAuthRouter from './auth/auth.routes';
import appendPostsRouter from './posts/posts.routes';
import appendCommentsRouter from './comments/comments.routes';
import appendLikesRouter from './likes/likes.routes';
import appendNotificationsRouter from './notifications/notifications.routes';
import appendUsersRouter from './users/users.routes';
import { NotFoundException } from './model/exceptions/not-found.exception';

const routes = Router();

appendUsersRouter(routes);
appendAuthRouter(routes);
appendPostsRouter(routes);
appendCommentsRouter(routes);
appendLikesRouter(routes);
appendNotificationsRouter(routes);

routes.all('*', (req, res) => {
  throw new NotFoundException("This resource doesn't exist");
});

export default routes;
