import { Router } from "express";
import { NotificationsController } from "./notifications.controller";
import { Validate } from "../shared/validate";

const router = Router();
router.get(
  "/:page",
  Validate.validateAuth,
  Validate.validatePage,
  NotificationsController.getNotificationsByReceiverIdAndPage
);

const notificationsRouter = Router();
notificationsRouter.use("/v1.1", router);
notificationsRouter.use("/v1.2", router);

export default notificationsRouter;
