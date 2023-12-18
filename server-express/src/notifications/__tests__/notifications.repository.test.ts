import { NotificationsRepository } from "../notifications.repository";
import { NotificationModel } from "../notifications.model";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe("NotificationsRepository", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    jest.restoreAllMocks();
    await NotificationModel.deleteMany({});
  });

  describe("createNotification", () => {
    it("should create a new notification", async () => {
      const body = "Test notification";
      const receiverId = "123";
      const result = await NotificationsRepository.createNotification(
        body,
        receiverId
      );

      expect(result.body).toEqual(body);
      expect(result.receiverId).toEqual(receiverId);
    });
  });

  describe("getNotificationsByReceiverIdAndPage", () => {
    it("should return notifications by receiverId and page", async () => {
      const receiverId = "123";
      const pageSize = 25;

      for (let i = 1; i <= 30; i++) {
        await NotificationModel.create({
          body: `Notification ${i}`,
          receiverId,
        });
      }

      const page = 1;
      const result =
        await NotificationsRepository.getNotificationsByReceiverIdAndPage(
          receiverId,
          page
        );

      expect(result).toHaveLength(pageSize);
      expect(result[0].body).toEqual("Notification 1");
      expect(result[0].receiverId).toEqual(receiverId);
    });

    it("should return an empty array if no notifications are found", async () => {
      const receiverId = "123";
      const page = 1;
      const result =
        await NotificationsRepository.getNotificationsByReceiverIdAndPage(
          receiverId,
          page
        );

      expect(result).toHaveLength(0);
    });
  });
});
