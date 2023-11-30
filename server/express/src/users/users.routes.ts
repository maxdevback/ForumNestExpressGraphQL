import { Router } from "express";
import { UsersController } from "./users.controller";

const router = Router();
router.post(
  "/register",
  UsersController.validateRegisterBody,
  UsersController.register
);
router.post("/login", UsersController.validateLoginBody, UsersController.login);
router.delete("/logout", UsersController.logout);
router.get("/my", UsersController.getMyInfo);
const usersRouter = Router();

usersRouter.use("/v1.1", router);

export default usersRouter;
