import { NotificationsRepository } from "./notifications.repository";

class NotificationsServiceClass {
  async sendNotification(body: string, receiverId: string) {
    return await NotificationsRepository.createNotification(body, receiverId);
  }
  async getNotificationsByReceiverIdAndPage(receiverId: string, page: number) {
    return await NotificationsRepository.getNotificationsByReceiverIdAndPage(
      receiverId,
      page
    );
  }
}

export const NotificationsService = new NotificationsServiceClass();
