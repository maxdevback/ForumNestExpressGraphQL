import { hash, compare } from "bcrypt";
import { UsersRepositoryV1_1 } from "./users.repository";

class UsersServiceClassV1_1 {
  async register(username: string, email: string, password: string) {
    const hashedPassword = await hash(password, 15);
    const newUser = await UsersRepositoryV1_1.register(
      username,
      email,
      hashedPassword
    );
    return { id: newUser.id, username: newUser.username };
  }
  async login(username: string, password: string) {
    const user = await UsersRepositoryV1_1.getUserByUsername(username);
    if (!(await compare(password, user.password)))
      throw { httpCode: 400, message: "Wrong password" };
    return { id: user.id, username: user.username };
  }
}

class UsersServiceClassV1_2 {
  hello() {}
}

export const UsersServiceV1_1 = new UsersServiceClassV1_1();
export const UsersServiceV1_2 = new UsersServiceClassV1_2();
