import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface IComment extends Document {
  username: string;
  body: string;
  postId: string;
  parentCommentId: string | null;
  authorId: string;
}

export const commentSchema = new Schema<IComment>({
  username: { type: String, required: true },
  body: { type: String, required: true },
  postId: { type: String, required: true, ref: "post" },
  parentCommentId: {
    type: String,
    required: true,
    ref: "comment",
    default: null,
  },
  authorId: { type: String, required: true, ref: "user" },
});

export const CommentsModel = model<IComment>("comment", commentSchema);
