import { hash, compare } from "bcrypt";
import { UsersRepository } from "./users.repository";

class UsersServiceClass {
  async register(username: string, email: string, password: string) {
    const hashedPassword = await hash(password, 15);
    const newUser = await UsersRepository.register(
      username,
      email,
      hashedPassword
    );
    return { _id: newUser.id, username: newUser.username };
  }
  async login(username: string, password: string) {
    const user = await UsersRepository.getUserByUsername(username);
    if (!(await compare(password, user.password)))
      throw { httpCode: 400, message: "Wrong password" };
    return { _id: user.id, username: user.username };
  }
}

export const UsersService = new UsersServiceClass();
