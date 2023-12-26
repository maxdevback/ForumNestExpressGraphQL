import { Router } from "express";
import { PostsController } from "./posts.controller";
import { PostsControllerV1_2 } from "./posts.controller.v1.2";
import { PostsMiddlewares } from "./posts.middlewares";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const postsRouter = Router();

postsRouter.get("/v1.1/id/:postId", PostsController.getByPostId);

postsRouter.get("/v1.2/id/:postId", PostsControllerV1_2.getByPostId);

postsRouter.get(
  "/v1.1/my/:page",
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  PostsController.getMyPostsByPage
);

postsRouter.get("/v1.1/author/:postId", PostsController.getAuthorByPostId);

postsRouter.get(
  "/v1.1/:authorId/:page",
  SharedMiddleWare.validatePage,
  PostsController.getPostsByAuthorAndPage
);

postsRouter.get(
  "/v1.1/:page",
  SharedMiddleWare.validatePage,
  PostsController.getPostsByPage
);
postsRouter.get(
  "/v1.2/my/:page",
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  PostsController.getMyPostsByPage
);

postsRouter.get("/v1.2/author/:postId", PostsControllerV1_2.getAuthorByPostId);

postsRouter.get(
  "/v1.2/:authorId/:page",
  SharedMiddleWare.validatePage,
  PostsControllerV1_2.getPostsByAuthorAndPage
);

postsRouter.get(
  "/v1.2/:page",
  SharedMiddleWare.validatePage,
  PostsControllerV1_2.getPostsByPage
);

postsRouter.post(
  "/v1.1",
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.createValidationBody,
  PostsController.create
);

postsRouter.patch(
  "/v1.1/:postId",
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.updateValidationBody,
  PostsController.updatePostByPostId
);

const PostsRouter = (router: Router) => {
  router.use("/posts", postsRouter);
};

export default PostsRouter;
