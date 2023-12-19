import { Router } from "express";
import { CommentsController } from "./comments.controller";
import { CommentsMiddleWares } from "./comments.middleware";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.get(
  "/:postId/:page",
  SharedMiddleWare.validatePage,
  CommentsController.getCommentsByPostIdAndPage
);
router.get(
  "/:postId/:commentId/:page",
  SharedMiddleWare.validatePage,
  CommentsController.getReplaysByCommentIdAndPostIdAndPage
);
router.post(
  "/:postId",
  CommentsMiddleWares.validateCreationBody,
  SharedMiddleWare.validateAuth,
  CommentsController.create
);
router.post(
  "/:postId/:parentCommentId",
  CommentsMiddleWares.validateCreationBody,
  SharedMiddleWare.validateAuth,
  CommentsController.createReplay
);
const commentsRouter = Router();

commentsRouter.use("/v1.1", router);
commentsRouter.use("/v1.2", router);

export default commentsRouter;
