import { Router } from 'express';
import { PostsController } from './posts.controller';
import { PostsControllerV1_2 } from './posts.controller.v1.2';
import { PostsMiddlewares } from './posts.middlewares';
import { SharedMiddleWare } from '../shared/shared.middlewares';
import { asyncWrap } from '../model/async-wrap/async-wrap.route';

const postsRouter = Router();

postsRouter.get('/v1.1/id/:postId', (req, res, next) =>
  asyncWrap(req, res, next, PostsController.getByPostId),
);

postsRouter.get('/v1.2/id/:postId', (req, res, next) =>
  asyncWrap(req, res, next, PostsControllerV1_2.getByPostId),
);

postsRouter.get(
  '/v1.1/my/:page',
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  (req, res, next) =>
    asyncWrap(req, res, next, PostsController.getMyPostsByPage),
);

postsRouter.get('/v1.1/author/:postId', (req, res, next) =>
  asyncWrap(req, res, next, PostsController.getAuthorByPostId),
);

postsRouter.get(
  '/v1.1/:authorId/:page',
  SharedMiddleWare.validatePage,
  (req, res, next) =>
    asyncWrap(req, res, next, PostsController.getPostsByAuthorAndPage),
);

postsRouter.get(
  '/v1.1/:page',
  SharedMiddleWare.validatePage,
  (req, res, next) => asyncWrap(req, res, next, PostsController.getPostsByPage),
);

postsRouter.get(
  '/v1.2/my/:page',
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  (req, res, next) =>
    asyncWrap(req, res, next, PostsController.getMyPostsByPage),
);

postsRouter.get('/v1.2/author/:postId', (req, res, next) =>
  asyncWrap(req, res, next, PostsControllerV1_2.getAuthorByPostId),
);

postsRouter.get(
  '/v1.2/:authorId/:page',
  SharedMiddleWare.validatePage,
  (req, res, next) =>
    asyncWrap(req, res, next, PostsControllerV1_2.getPostsByAuthorAndPage),
);

postsRouter.get(
  '/v1.2/:page',
  SharedMiddleWare.validatePage,
  (req, res, next) =>
    asyncWrap(req, res, next, PostsControllerV1_2.getPostsByPage),
);

postsRouter.post(
  '/v1.1',
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.createValidationBody,
  (req, res, next) => asyncWrap(req, res, next, PostsController.create),
);

postsRouter.patch(
  '/v1.1/:postId',
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.updateValidationBody,
  (req, res, next) =>
    asyncWrap(req, res, next, PostsController.updatePostByPostId),
);

const PostsRouter = (router: Router) => {
  router.use('/posts', postsRouter);
};

export default PostsRouter;
