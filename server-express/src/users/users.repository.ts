import { Types } from 'mongoose';
import { UserModel } from './users.model';

class UsersRepositoryClass {
  async create(username: string, email: string, password: string) {
    const newUser = new UserModel({ username, email, password });
    return await newUser.save();
  }
  async findUserByUsernameOld(username: string) {
    return await UserModel.findOne({ username });
  }
  async findUserByUsernameOrEmailOld(username: string, email: string) {
    const user = await UserModel.findOne({
      $or: [
        {
          username,
        },
        { email },
      ],
    });
    return user;
  }
  async findUserByIdOld(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }
  async deleteAccount(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
  async findUserByUsername(username: string) {
    const user = await UserModel.aggregate([
      { $match: { username: username } },
    ]);

    return user[0];
  }
  async findByUsernameOrEmail(username: string, email: string) {
    return await UserModel.aggregate([
      { $match: { $or: [{ username }, { email }] } },
    ]);
  }
  async findUserById(id: string) {
    const { ObjectId } = Types;
    const user = await UserModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
    ]);

    return user[0];
  }
}

export const UsersRepository = new UsersRepositoryClass();
