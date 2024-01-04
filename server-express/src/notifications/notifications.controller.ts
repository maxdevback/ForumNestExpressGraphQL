import { Request, Response } from 'express';
import { NotificationsService } from './notifications.service';
import { joiValidateAuth } from '../shared/validators/joi.validate.auth';
import { joiValidatePage } from '../shared/validators/joi.validate.page';

class NotificationsControllerClass {
  async getNotificationsByReceiverIdAndPage(req: Request, res: Response) {
    try {
      joiValidateAuth(req);
      joiValidatePage(+req.params.page);
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
