import { Router } from "express";
import { PostsController } from "./posts.controller";
import { Validate } from "../shared/validate";
import { PostsMiddlewares } from "./posts.middlewares";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.get("/id/:postId", PostsController.getByPostId);
router.get(
  "/my/:page",
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  PostsController.getMyPostsByPage
);
router.get("/author/:postId", PostsController.getAuthorByPostId);
router.get(
  "/:authorId/:page",
  SharedMiddleWare.validatePage,
  PostsController.getPostsByAuthorAndPage
);
router.get("/:page", Validate.validatePage, PostsController.getPostsByPage);
router.post(
  "/",
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.createValidationBody,
  PostsController.create
);
router.patch(
  "/:postId",
  SharedMiddleWare.validateAuth,
  PostsMiddlewares.updateValidationBody,
  PostsController.updatePostByPostId
);

const postsRouter = Router();
postsRouter.use("/v1.1", router);
postsRouter.use("/v1.2", router);

export default postsRouter;
