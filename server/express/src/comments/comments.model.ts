import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface IComment extends Document {
  username: string;
  body: string;
  postId: string;
  parentCommentId: string | null;
  roughNumberOfLikes: number;
  authorId: string;
}

export const commentSchema = new Schema<IComment>({
  username: { type: String, required: true },
  body: { type: String, required: true },
  postId: { type: String, required: true, ref: "post" },
  parentCommentId: {
    type: String,
    ref: "comment",
    default: null,
  },
  roughNumberOfLikes: { type: Number, required: true, default: 0 },
  authorId: { type: String, required: true, ref: "user" },
});

export const CommentModel = model<IComment>("comment", commentSchema);
