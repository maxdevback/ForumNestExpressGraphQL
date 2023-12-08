import { UserModel } from "./users.model";

class UsersRepositoryClass {
  async register(username: string, email: string, password: string) {
    const userWithThatUsername = await UserModel.aggregate([
      { $match: { username: username } },
    ]);

    const userWithThatEmail = await UserModel.aggregate([
      { $match: { email: email } },
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

    const user = await UserModel.aggregate([
      { $addFields: { username: username, email: email, password: password } },
      {
        $merge: {
          into: "users",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
      { $project: { _id: 1 } },
    ]);
    return user[0];
  }

  async getUserByUsername(username: string) {
    const user = await UserModel.aggregate([
      { $match: { username: username } },
    ]);
    console.log(user);
    if (!user || user.length === 0) {
      throw {
        httpCode: 404,
        message: "The user with that username was not found",
      };
    }

    return user[0];
  }

  async getUserById(id: string) {
    const user = await UserModel.aggregate([{ $match: { _id: id } }]);

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
      { $match: { _id: id } },
      {
        $merge: {
          into: "deletedUsers",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
      { $project: {} },
    ]);
  }
}

export const UsersRepository_v1_2 = new UsersRepositoryClass();
