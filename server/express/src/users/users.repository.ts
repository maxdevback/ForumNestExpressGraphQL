import { UserModel } from "./users.model";

class UsersRepositoryClass {
  async register(username: string, email: string, password: string) {
    const userWithThatUsername = await UserModel.findOne({ username });
    const userWithThatEmail = await UserModel.findOne({ email });
    if (userWithThatUsername || userWithThatEmail)
      throw {
        httpCode: 409,
        message: "A user with that username already exists.",
      };
    const newUser = new UserModel({ username, email, password });
    return await newUser.save();
  }
  async getUserByUsername(username: string) {
    const user = await UserModel.findOne({ username });
    if (!user)
      throw {
        httpCode: 404,
        message: "The user with that username was not found",
      };
    return user;
  }
  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    if (!user)
      throw {
        httpCode: 404,
        message: "The user with that id was not found",
      };
    return user;
  }
}

export const UsersRepository = new UsersRepositoryClass();
