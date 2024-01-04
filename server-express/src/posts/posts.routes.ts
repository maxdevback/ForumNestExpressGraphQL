import { Router } from 'express';
import { PostsController } from './posts.controller';
import { PostsControllerV1_2 } from './posts.controller.v1.2';
import { PostsMiddlewares } from './posts.middlewares';
import { SharedMiddleWare } from '../shared/middlewares';
import { controllerWrapper } from '../model/controller-wrapper/controller.wrapper';

const postsRouter = Router();

postsRouter.get(
  '/v1.1/id/:postId',
  controllerWrapper(PostsController.getByPostId),
);

postsRouter.get(
  '/v1.2/id/:postId',
  controllerWrapper(PostsControllerV1_2.getByPostId),
);

postsRouter.get(
  '/v1.1/my/:page',
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  controllerWrapper(PostsController.getMyPostsByPage),
);

postsRouter.get(
  '/v1.1/author/:postId',
  controllerWrapper(PostsController.getAuthorByPostId),
);

postsRouter.get(
  '/v1.1/:authorId/:page',
  SharedMiddleWare.validatePage,
  controllerWrapper(PostsController.getPostsByAuthorAndPage),
);

postsRouter.get(
  '/v1.1/:page',
  SharedMiddleWare.validatePage,
  controllerWrapper(PostsController.getPostsByPage),
);

postsRouter.get(
  '/v1.2/my/:page',
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  controllerWrapper(PostsController.getMyPostsByPage),
);

postsRouter.get(
  '/v1.2/author/:postId',
  controllerWrapper(PostsControllerV1_2.getAuthorByPostId),
);

postsRouter.get(
  '/v1.2/:authorId/:page',
  SharedMiddleWare.validatePage,
  controllerWrapper(PostsControllerV1_2.getPostsByAuthorAndPage),
);

postsRouter.get(
  '/v1.2/:page',
  SharedMiddleWare.validatePage,
  controllerWrapper(PostsControllerV1_2.getPostsByPage),
);

postsRouter.post(
  '/v1.1',
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.createValidationBody,
  controllerWrapper(PostsController.create),
);

postsRouter.patch(
  '/v1.1/:postId',
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.updateValidationBody,
  controllerWrapper(PostsController.updatePostByPostId),
);

const PostsRouter = (router: Router) => {
  router.use('/posts', postsRouter);
};

export default PostsRouter;
