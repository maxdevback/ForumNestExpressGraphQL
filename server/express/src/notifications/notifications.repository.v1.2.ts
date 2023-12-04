import { NotificationModel } from "./notifications.model";

class NotificationsRepositoryClass {
  async createNotification(body: string, receiverId: string) {
    return await NotificationModel.aggregate([
      { $addFields: { body, receiverId } },
      {
        $merge: {
          into: "notifications",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
    ]);
  }

  async getNotificationsByReceiverIdAndPage(receiverId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await NotificationModel.aggregate([
      {
        $facet: {
          notifications: [
            { $match: { receiverId } },
            { $skip: skip },
            { $limit: pageSize },
          ],
          count: [{ $match: { receiverId } }, { $count: "total" }],
        },
      },
      {
        $project: {
          notifications: 1,
          total: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] },
        },
      },
    ]);
  }
}

export const NotificationsRepository_v1_2 = new NotificationsRepositoryClass();
