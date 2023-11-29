import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  body: string;
  //TODO:
  // likes: string[];
  // comments: { username: string; body: string }[];
  authorId: string;
}

export const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  authorId: { type: String, required: true },
});

export const PostModel = model<IPost>("post", postSchema);
