import { hash, compare } from "bcrypt";
import { UsersRepository } from "./users.repository";
import { UsersRepository_v1_2 } from "./users.repository.v1.2";

class UsersServiceClass {
  async register(
    username: string,
    email: string,
    password: string,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    const hashedPassword = await hash(password, 15);
    const newUser =
      v === "v1.1"
        ? await UsersRepository.register(username, email, hashedPassword)
        : await UsersRepository_v1_2.register(username, email, hashedPassword);
    return { _id: newUser.id, username: newUser.username };
  }
  async login(username: string, password: string, v: "v1.1" | "v1.2" = "v1.1") {
    const user =
      v === "v1.1"
        ? await UsersRepository.getUserByUsername(username)
        : await UsersRepository_v1_2.getUserByUsername(username);
    if (!(await compare(password, user.password)))
      throw { httpCode: 400, message: "Wrong password" };
    return { _id: user._id, username: user.username };
  }
  async deleteAccount(id: string, v: "v1.1" | "v1.2" = "v1.1") {
    return v === "v1.1"
      ? await UsersRepository.deleteAccount(id)
      : await UsersRepository_v1_2.deleteAccount(id);
  }
}

export const UsersService = new UsersServiceClass();
