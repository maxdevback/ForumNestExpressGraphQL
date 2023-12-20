import { Router } from "express";
import { AuthControllerOld } from "./auth.controller.old";
import { AuthController_v1_2 } from "./auth.controller.v1.2";
import { AuthMiddlewares } from "./auth.middlewares";

const router = Router();

router.get("/v1.1/my", AuthControllerOld.getMyInfo);
router.post(
  "/v1.1/login",
  AuthMiddlewares.validateLoginBody,
  AuthControllerOld.login
);
router.post(
  "/v1.2/login",
  AuthMiddlewares.validateLoginBody,
  AuthController_v1_2.login
);
router.post(
  "/v1.2/register",
  AuthMiddlewares.validateRegisterBody,
  AuthControllerOld.register
);

export default router;
