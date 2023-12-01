import { Request, Response } from "express";
import { Validate } from "../server/validate";
import { NotificationsService } from "./notifications.service";

class NotificationsControllerClass {
  async getNotificationsByReceiverIdAndPage(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      Validate.validatePage(+req.params.page);
      res.send(
        await NotificationsService.getNotificationsByReceiverIdAndPage(
          req.session.user!._id,
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const NotificationsController = new NotificationsControllerClass();
