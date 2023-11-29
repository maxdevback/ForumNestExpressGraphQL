import { Request, Response } from "express";
import { UserModel } from "./users.model";

class UsersRepositoryClassV1_1 {
  async signup(username: string, password: string) {
    const userWithThatUsername = await UserModel.findOne({ username });
    if (userWithThatUsername)
      throw {
        httpCode: 409,
        message: "A user with that username already exists.",
      };
    const newUser = new UserModel({ username, password });
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
}

class UsersRepositoryClassV1_2 {
  hello(req: Request, res: Response) {
    res.send("hello from v1.2");
  }
}

export const UsersRepositoryV1_1 = new UsersRepositoryClassV1_1();
export const UsersRepositoryV1_2 = new UsersRepositoryClassV1_2();
