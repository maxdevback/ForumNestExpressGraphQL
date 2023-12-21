import { Router } from "express";
import { UsersController } from "./users.controller";
<<<<<<< Updated upstream

const router = Router();
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.delete("/logout", UsersController.logout);
router.get("/my", UsersController.getMyInfo);
router.delete("/delete", UsersController.deleteAccount);
=======
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.delete(
  "/delete",
  SharedMiddleWare.validateAuth,
  UsersController.deleteAccount
);
>>>>>>> Stashed changes
const usersRouter = Router();

usersRouter.use("/v1.1", router);
usersRouter.use("/v1.2", router);

export default usersRouter;
