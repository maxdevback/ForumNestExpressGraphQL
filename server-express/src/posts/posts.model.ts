import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  body: string;
  hasComments: boolean;
  roughNumberOfLikes: number;
  authorId: string;
}

export const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  hasComments: { type: Boolean, required: true, default: false },
  roughNumberOfLikes: { type: Number, required: true, default: 0 },
  authorId: { type: String, required: true, ref: "user" },
});

export const PostModel = model<IPost>("post", postSchema);
