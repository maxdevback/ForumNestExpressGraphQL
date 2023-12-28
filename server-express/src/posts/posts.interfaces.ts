import { Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
  hasComments: boolean;
  roughNumberOfLikes: number;
  authorId: string;
}
