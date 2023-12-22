import { hash, compare } from "bcrypt";

class AuthHelpersClass {
  salt = 15;
  async hashPassword(password: string) {
    console.log(password);
    return await hash(password, this.salt);
  }
  async comparePassword(purePassword: string, hashedPassword: string) {
    return await compare(purePassword, hashedPassword);
  }
}

export const AuthHelpers = new AuthHelpersClass();
