import { Router } from "express";
import { LikesController } from "./likes.controller";

const router = Router();
router.get("/isLiked/:type/:entityId", (req, res) =>
  LikesController.isLikedEntity(req, res)
);
router.post("/post/:postId", (req, res) => LikesController.likePost(req, res));
router.post("/comment/:commentId", (req, res) =>
  LikesController.likeComment(req, res)
);

const likesRouter = Router();

likesRouter.use("/v1.1", router);
likesRouter.use("/v1.2", router);

export default likesRouter;
