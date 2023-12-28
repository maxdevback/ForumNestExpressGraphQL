import { Schema, model } from 'mongoose';
import { IUser } from './users.interfaces';

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>('user', userSchema);
