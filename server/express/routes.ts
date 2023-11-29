import { Router } from "express";
import usersRouter from "./src/users/users.routes";

const routes = Router();
routes.use(usersRouter);

export default routes;
