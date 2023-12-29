import { Schema, model } from 'mongoose';
import { IUser } from './users.interfaces';

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>('user', userSchema);
