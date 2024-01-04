import { Router } from "express";
import { AuthMiddlewares } from "../auth/auth.middlewares";
const router = Router();

router.use(AuthMiddlewares.checkJwt);

export default router;
