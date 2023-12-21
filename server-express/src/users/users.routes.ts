import { Router } from "express";
import { UsersController } from "./users.controller";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.delete(
  "/delete",
  SharedMiddleWare.validateAuth,
  UsersController.deleteAccount
);
const usersRouter = Router();

usersRouter.use("/v1.1", router);
usersRouter.use("/v1.2", router);

export default usersRouter;
