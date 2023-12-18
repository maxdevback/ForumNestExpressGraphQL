import { Router } from "express";
import { PostsController } from "./posts.controller";
import { Validate } from "../shared/validate";
import { PostsMiddlewares } from "./posts.middlewares";

const router = Router();
router.get("/id/:postId", PostsController.getByPostId);
router.get(
  "/my/:page",
  Validate.validateAuth,
  Validate.validatePage,
  PostsController.getMyPostsByPage
);
router.get("/author/:postId", PostsController.getAuthorByPostId);
router.get(
  "/:authorId/:page",
  Validate.validatePage,
  PostsController.getPostsByAuthorAndPage
);
router.get("/:page", Validate.validatePage, PostsController.getPostsByPage);
router.post(
  "/",
  Validate.validateAuth,
  PostsMiddlewares.createValidationBody,
  PostsController.create
);
router.patch(
  "/:postId",
  Validate.validateAuth,
  PostsController.updatePostByPostId
);

const postsRouter = Router();
postsRouter.use("/v1.1", router);
postsRouter.use("/v1.2", router);

export default postsRouter;
