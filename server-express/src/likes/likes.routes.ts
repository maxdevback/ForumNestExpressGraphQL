import { Router } from "express";
import { LikesController } from "./likes.controller";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.get(
  "/isLiked/:type/:entityId",
  SharedMiddleWare.validateAuth,
  LikesController.isLikedEntity
);
router.post(
  "/post/:postId",
  SharedMiddleWare.validateAuth,
  LikesController.likePost
);
router.post(
  "/comment/:commentId",
  SharedMiddleWare.validateAuth,
  LikesController.likeComment
);

const likesRouter = Router();

likesRouter.use("/v1.1", router);
likesRouter.use("/v1.2", router);

export default likesRouter;
