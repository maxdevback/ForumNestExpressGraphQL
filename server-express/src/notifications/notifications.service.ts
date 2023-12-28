import { NotificationsRepository } from './notifications.repository';

class NotificationsServiceClass {
  async sendNotification(
    body: string,
    receiverId: string,
    v: 'v1.1' | 'v1.2' = 'v1.1',
  ) {
    return v === 'v1.1'
      ? await NotificationsRepository.createNotification(body, receiverId)
      : await NotificationsRepository.createNotification(body, receiverId);
  }
  async getNotificationsByReceiverIdAndPage(
    receiverId: string,
    page: number,
    v: 'v1.1' | 'v1.2' = 'v1.1',
  ) {
    return v === 'v1.1'
      ? await NotificationsRepository.getNotificationsByReceiverIdAndPage(
          receiverId,
          page,
        )
      : await NotificationsRepository.getNotificationsByReceiverIdAndPage(
          receiverId,
          page,
        );
  }
}

export const NotificationsService = new NotificationsServiceClass();
