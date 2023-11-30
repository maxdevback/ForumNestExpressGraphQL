import { Router } from "express";

const router = Router();

const likesRouter = Router();

likesRouter.use("/v1.1", router);

export default likesRouter;
