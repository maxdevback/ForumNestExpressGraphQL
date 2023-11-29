import { Router } from "express";
import { UsersControllerV1_1, UsersControllerV1_2 } from "./users.controller";

const routerV1_1 = Router();
routerV1_1.post(
  "/register",
  UsersControllerV1_1.validateRegisterBody,
  UsersControllerV1_1.register
);
routerV1_1.post(
  "/login",
  UsersControllerV1_1.validateLoginBody,
  UsersControllerV1_1.login
);
routerV1_1.get("/my", UsersControllerV1_1.getMyInfo);
const routerV1_2 = Router();
routerV1_2.get("/", UsersControllerV1_2.hello);
const usersRouter = Router();

usersRouter.use("/v1.1", routerV1_1);
usersRouter.use("/v1.2", routerV1_2);

export default usersRouter;
