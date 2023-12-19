import { hash, compare } from "bcrypt";
import { UsersExceptions } from "./users.exceptions";

class UsersHelpersClass {
  async comparePassword(purePassword: string, hashedPassword: string) {
    try {
      return await compare(purePassword, hashedPassword);
    } catch {
      throw UsersExceptions.wrongPassword();
    }
  }
  async hashPassword(password: string) {
    return await hash(password, 15);
  }
}

export const UsersHelpers = new UsersHelpersClass();
