import { Router } from "express";
import { AuthControllerOld } from "./auth.controller.old";
import { AuthController_v1_2 } from "./auth.controller.v1.2";
import { AuthMiddlewares } from "./auth.middlewares";

const authRouter = Router();

authRouter.get("/v1.1/my", AuthControllerOld.getMyInfo);
authRouter.post(
  "/v1.1/login",
  AuthMiddlewares.validateLoginBody,
  AuthControllerOld.login
);
authRouter.post(
  "/v1.2/login",
  AuthMiddlewares.validateLoginBody,
  AuthController_v1_2.login
);
authRouter.post(
  "/v1.2/register",
  AuthMiddlewares.validateRegisterBody,
  AuthControllerOld.register
);

const AuthRouter = (router: Router) => {
  router.use("/auth", authRouter);
};

export default AuthRouter;
