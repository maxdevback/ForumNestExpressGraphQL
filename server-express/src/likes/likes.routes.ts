import { Router } from "express";
import { LikesController } from "./likes.controller";
import { Validate } from "../shared/validate";

const router = Router();
router.get(
  "/isLiked/:type/:entityId",
  Validate.validateAuth,
  LikesController.isLikedEntity
);
router.post("/post/:postId", Validate.validateAuth, LikesController.likePost);
router.post(
  "/comment/:commentId",
  Validate.validateAuth,
  LikesController.likeComment
);

const likesRouter = Router();

likesRouter.use("/v1.1", router);
likesRouter.use("/v1.2", router);

export default likesRouter;
