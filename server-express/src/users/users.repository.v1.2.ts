import { UsersExceptions } from "./users.exceptions";
import { UserModel } from "./users.model";

class UsersRepositoryClass {
  async create(username: string, email: string, password: string) {
    console.log("In creating");
    // const user = await UserModel.aggregate([
    //   {
    //     $addFields: { username: username, email: email, password: password },
    //   },
    //   {
    //     $merge: {
    //       into: "users",
    //       whenNotMatched: "insert",
    //     },
    //   },
    // ]);
    const user = new UserModel({ username, email, password });
    await user.save();
    console.log("user in create", user);
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await UserModel.aggregate([
      { $match: { username: username } },
    ]);
    if (user.length === 0) {
      throw UsersExceptions.NotFound(
        "The user with that username was not found"
      );
    }

    return user[0];
  }
  async getByUsernameOrEmail(username: string, email: string) {
    const user = await UserModel.aggregate([
      { $match: { $or: [{ username }, { email }] } },
    ]);
    if (!user[0]) throw new Error();
    return user[0];
  }
  async getUserById(id: string) {
    const user = await UserModel.aggregate([{ $match: { id: id } }]);

    if (!user || user.length === 0) {
      throw UsersExceptions.NotFound("The user with that id was not found");
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
