import { Schema } from "mongoose";
import { model } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  // email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>("user", userSchema);
