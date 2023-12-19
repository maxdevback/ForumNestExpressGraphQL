import { Router } from "express";
import { NotificationsController } from "./notifications.controller";
import { SharedMiddleWare } from "../shared/shared.middlewares";

const router = Router();
router.get(
  "/:page",
  SharedMiddleWare.validateAuth,
  SharedMiddleWare.validatePage,
  NotificationsController.getNotificationsByReceiverIdAndPage
);

const notificationsRouter = Router();
notificationsRouter.use("/v1.1", router);
notificationsRouter.use("/v1.2", router);

export default notificationsRouter;
