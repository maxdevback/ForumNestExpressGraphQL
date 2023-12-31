import { compare, hash } from "bcrypt";
import { AuthExceptions } from "./auth.exceptions";

class AuthHelpersClass {
  async comparePassword(purePassword: string, hashedPassword: string) {
    return await compare(purePassword, hashedPassword);
  }
  async hashPassword(password: string) {
    return await hash(password, 15);
  }
}

export const AuthHelpers = new AuthHelpersClass();
