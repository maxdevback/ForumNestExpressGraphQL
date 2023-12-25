import { Router } from "express";
import { PostsController } from "./posts.controller";
import { PostsControllerV1_2 } from "./posts.controller.v1.2";
import { PostsMiddlewares } from "./posts.middlewares";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.get("/v1.1/id/:postId", PostsController.getByPostId);

router.get("/v1.2/id/:postId", PostsControllerV1_2.getByPostId);

router.get(
  "/v1.1/my/:page",
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  PostsController.getMyPostsByPage
);

router.get("/v1.1/author/:postId", PostsController.getAuthorByPostId);

router.get(
  "/v1.1/:authorId/:page",
  SharedMiddleWare.validatePage,
  PostsController.getPostsByAuthorAndPage
);

router.get(
  "/v1.1/:page",
  SharedMiddleWare.validatePage,
  PostsController.getPostsByPage
);
router.get(
  "/v1.2/my/:page",
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  PostsController.getMyPostsByPage
);

router.get("/v1.2/author/:postId", PostsControllerV1_2.getAuthorByPostId);

router.get(
  "/v1.2/:authorId/:page",
  SharedMiddleWare.validatePage,
  PostsControllerV1_2.getPostsByAuthorAndPage
);

router.get(
  "/v1.2/:page",
  SharedMiddleWare.validatePage,
  PostsControllerV1_2.getPostsByPage
);

router.post(
  "/v1.1",
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.createValidationBody,
  PostsController.create
);

router.patch(
  "/v1.1/:postId",
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.updateValidationBody,
  PostsController.updatePostByPostId
);

export default router;
