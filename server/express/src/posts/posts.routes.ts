import { Router } from "express";
import { PostsControllerV1_1, PostsControllerV1_2 } from "./posts.controller";

const routerV1_1 = Router();
routerV1_1.post(
  "/",
  PostsControllerV1_1.validateCreationBody,
  PostsControllerV1_1.create
);
routerV1_1.get("/:authorId/:page", PostsControllerV1_1.getPostsByAuthorAndPage);
routerV1_1.get("/:page", PostsControllerV1_1.getPostsByPage);
routerV1_1.get("/my/:page", PostsControllerV1_1.getMyPostsByPage);
// routerV1_2.get("/", UsersControllerV1_2.hello);
const postsRouter = Router();

postsRouter.use("/v1.1", routerV1_1);
// usersRouter.use("/v1.2", routerV1_2);

export default postsRouter;
