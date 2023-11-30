import { Router } from "express";
import { PostsController } from "./posts.controller";

const router = Router();
router.post("/", PostsController.validateCreationBody, PostsController.create);
router.get("/:authorId/:page", PostsController.getPostsByAuthorAndPage);
router.get("/:page", PostsController.getPostsByPage);
router.get("/my/:page", PostsController.getMyPostsByPage);
const postsRouter = Router();

postsRouter.use("/v1.1", router);
//postsRouter.use("/v1.2", router);

export default postsRouter;
