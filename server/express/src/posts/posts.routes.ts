import { Router } from "express";
import { PostsController } from "./posts.controller";

const router = Router();
router.post("/", (req, res) => PostsController.create(req, res));
router.get("/id/:postId", (req, res) => PostsController.getByPostId(req, res));
router.get("/my/:page", (req, res) =>
  PostsController.getMyPostsByPage(req, res)
);
router.get("/author/:postId", (req, res) =>
  PostsController.getAuthorByPostId(req, res)
);
router.get("/:authorId/:page", (req, res) =>
  PostsController.getPostsByAuthorAndPage(req, res)
);
router.get("/:page", (req, res) => PostsController.getPostsByPage(req, res));
router.patch("/:postId", (req, res) =>
  PostsController.updatePostByPostId(req, res)
);

const postsRouter = Router();
postsRouter.use("/v1.1", router);
postsRouter.use("/v1.2", router);

export default postsRouter;
