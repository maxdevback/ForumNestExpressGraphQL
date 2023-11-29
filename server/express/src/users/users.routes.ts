import { Router } from "express";
import { UsersControllerV1_1, UsersControllerV1_2 } from "./users.controller";
import passport from "passport";

const routerV1_1 = Router();
routerV1_1.post(
  "/signup",
  UsersControllerV1_1.validateAuthBody,
  UsersControllerV1_1.signup
);
routerV1_1.post(
  "/login",
  UsersControllerV1_1.validateAuthBody,
  UsersControllerV1_1.login
);
const routerV1_2 = Router();
routerV1_2.get("/", UsersControllerV1_2.hello);
const usersRouter = Router();

usersRouter.use("/v1.1", routerV1_1);
usersRouter.use("/v1.2", routerV1_2);

export default usersRouter;
