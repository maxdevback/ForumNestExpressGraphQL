import { Router } from "express";
import { UsersController } from "./users.controller";

const router = Router();
router.get("/my", UsersController.getMyInfo);
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.delete("/logout", UsersController.logout);
router.delete("/delete", UsersController.deleteAccount);
const usersRouter = Router();

usersRouter.use("/v1.1", router);
usersRouter.use("/v1.2", router);

export default usersRouter;
