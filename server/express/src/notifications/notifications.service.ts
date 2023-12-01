import { NotificationsRepository } from "./notifications.repository";

class NotificationsServiceClass {
  async sendNotification(body: string, receiverId: string) {}
  async getNotificationsByReceiverIdAndPage(receiverId: string, page: number) {
    return await NotificationsRepository.getNotificationsByReceiverIdAndPage(
      receiverId,
      page
    );
  }
}

export const NotificationsService = new NotificationsServiceClass();
