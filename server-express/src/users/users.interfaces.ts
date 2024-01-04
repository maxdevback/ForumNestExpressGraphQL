import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export interface ISession {
  user: { _id: string; username: string } | null;
}
