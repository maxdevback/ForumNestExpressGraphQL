import { NotificationModel } from './notifications.model';

class NotificationsRepositoryClass {
  async createNotification(body: string, receiverId: string) {
    const newNotification = new NotificationModel({ body, receiverId });
    return await newNotification.save();
  }
  async getNotificationsByReceiverIdAndPage(receiverId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * 25;
    return await NotificationModel.find({ receiverId })
      .skip(skip)
      .limit(pageSize);
  }
}

export const NotificationsRepository = new NotificationsRepositoryClass();
