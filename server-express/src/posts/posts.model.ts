import { Schema, model } from 'mongoose';
import { IPost } from './posts.interfaces';

export const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  hasComments: { type: Boolean, required: true, default: false },
  roughNumberOfLikes: { type: Number, required: true, default: 0 },
  authorId: { type: String, required: true, ref: 'user' },
});

export const PostModel = model<IPost>('post', postSchema);
