import { Router } from "express";
import { NotificationsController } from "./notifications.controller";

const router = Router();
router.get("/:page", (req, res) =>
  NotificationsController.getNotificationsByReceiverIdAndPage(req, res)
);

const notificationsRouter = Router();
notificationsRouter.use("/v1.1", router);
notificationsRouter.use("/v1.2", router);

const NotificationsRouter = (router: Router) => {
  router.use("/notifications", notificationsRouter);
};

export default NotificationsRouter;
