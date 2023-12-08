import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface INotification extends Document {
  body: string;
  receiverId: string;
}

export const notificationSchema = new Schema<INotification>(
  {
    body: { type: String, required: true },
    receiverId: { type: String, required: true, ref: "user" },
  },
  { timestamps: true }
);

export const NotificationModel = model<INotification>(
  "notification",
  notificationSchema
);
