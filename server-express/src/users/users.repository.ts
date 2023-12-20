import { UsersExceptions } from "./users.exceptions";
import { UserModel } from "./users.model";

class UsersRepositoryClass {
  async create(username: string, email: string, password: string) {
    const newUser = new UserModel({ username, email, password });
    return await newUser.save();
  }
  async getUserByUsername(username: string) {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error();
    return user;
  }
  async getUserByUserByUsernameOrEmail(username: string, email: string) {
    const user = await UserModel.findOne({
      $or: [
        {
          username,
        },
        { email },
      ],
    });
    if (!user)
      throw UsersExceptions.NotFound("The user with this info is not found");
    return user;
  }
  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    if (!user)
      throw UsersExceptions.NotFound("The user with this ID is not found");
    return user;
  }
  async deleteAccount(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export const UsersRepository = new UsersRepositoryClass();
