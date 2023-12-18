import { Router } from "express";
import { CommentsController } from "./comments.controller";
import { CommentsMiddleWares } from "./comments.middleware";
import { Validate } from "../shared/validate";

const router = Router();
router.get(
  "/:postId/:page",
  Validate.validatePage,
  CommentsController.getCommentsByPostIdAndPage
);
router.get(
  "/:postId/:commentId/:page",
  Validate.validatePage,
  CommentsController.getReplaysByCommentIdAndPostIdAndPage
);
router.post(
  "/:postId",
  CommentsMiddleWares.validateCreationBody,
  Validate.validateAuth,
  CommentsController.create
);
router.post(
  "/:postId/:parentCommentId",
  CommentsMiddleWares.validateCreationBody,
  Validate.validateAuth,
  CommentsController.createReplay
);
const commentsRouter = Router();

commentsRouter.use("/v1.1", router);
commentsRouter.use("/v1.2", router);

export default commentsRouter;
