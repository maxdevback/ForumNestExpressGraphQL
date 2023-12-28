import { Request, Response } from 'express';
import { Validate } from '../shared/validate';
import { NotificationsService } from './notifications.service';

class NotificationsControllerClass {
  async getNotificationsByReceiverIdAndPage(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      Validate.validatePage(+req.params.page);
      res.send(
        await NotificationsService.getNotificationsByReceiverIdAndPage(
          req.session.user!._id,
          +req.params.page,
          req.baseUrl.split('/')[2] as 'v1.1' | 'v1.2',
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const NotificationsController = new NotificationsControllerClass();
