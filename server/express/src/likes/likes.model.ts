import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface ILike extends Document {
  likedEntityId: string;
  authorId: string;
}

export const likeSchema = new Schema<ILike>({
  likedEntityId: { type: String, required: true },
  authorId: { type: String, required: true, ref: "user" },
});

export const LikesModel = model<ILike>("like", likeSchema);
