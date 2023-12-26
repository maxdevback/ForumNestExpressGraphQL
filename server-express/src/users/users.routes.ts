import { Router } from "express";
import { UsersControllerOld } from "./users.controller";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.delete(
  "/delete",
  SharedMiddleWare.validateAuth,
  UsersControllerOld.deleteAccount
);
const usersRouter = Router();

usersRouter.use("/v1.1", router);

const UsersRouter = (router: Router) => {
  router.use("/users", usersRouter);
};

export default UsersRouter;
