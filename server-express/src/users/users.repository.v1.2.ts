import { UserModel } from "./users.model";

class UsersRepositoryClass {
  async register(username: string, email: string, password: string) {
    const userWithThatUsername = await UserModel.aggregate([
      { $match: { username: username } },
      { $project: { _id: 1 } },
    ]);

    const userWithThatEmail = await UserModel.aggregate([
      { $match: { email: email } },
      { $project: { _id: 1 } },
    ]);

    if (
      (userWithThatUsername && userWithThatUsername.length > 0) ||
      (userWithThatEmail && userWithThatEmail.length > 0)
    ) {
      throw {
        httpCode: 409,
        message: "A user with that username or email already exists.",
      };
    }

    await UserModel.aggregate([
      { $addFields: { username: username, email: email, password: password } },
      {
        $merge: {
          into: "users",
          whenNotMatched: "insert",
        },
      },
    ]);

    const userAggregateResult = await UserModel.aggregate([
      { $match: {} },
      { $project: { _id: 1 } },
    ]);

    return userAggregateResult[0];
  }

  async getUserByUsername(username: string) {
    const user = await UserModel.aggregate([
      { $match: { username: username } },
    ]);
    if (!user || user.length === 0) {
      throw {
        httpCode: 404,
        message: "The user with that username was not found",
      };
    }

    return user[0];
  }

  async getUserById(id: string) {
    const user = await UserModel.aggregate([
      { $match: { id: id } },
      { $project: { id: 1 } },
    ]);

    if (!user || user.length === 0) {
      throw {
        httpCode: 404,
        message: "The user with that id was not found",
      };
    }

    return user[0];
  }

  async deleteAccount(id: string) {
    return await UserModel.aggregate([
      { $match: { id: id } },
      {
        $out: "deletedUsers",
      },
    ]);
  }
}

export const UsersRepository_v1_2 = new UsersRepositoryClass();
