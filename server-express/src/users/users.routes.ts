import { Router } from "express";
import { UsersController } from "./users.controller";
import { UsersMiddlewares } from "./users.middlewares";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.get("/my", UsersController.getMyInfo);
router.post(
  "/register",
  UsersMiddlewares.validateRegisterBody,
  UsersController.register
);
router.post(
  "/login",
  UsersMiddlewares.validateLoginBody,
  UsersController.login
);
router.delete("/logout", SharedMiddleWare.validateAuth, UsersController.logout);
router.delete(
  "/delete",
  SharedMiddleWare.validateAuth,
  UsersController.deleteAccount
);
const usersRouter = Router();

usersRouter.use("/v1.1", router);
usersRouter.use("/v1.2", router);

export default usersRouter;
