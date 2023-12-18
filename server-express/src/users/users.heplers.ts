import { hash, compare } from "bcrypt";

class UsersHelpersClass {
  comparePassword(purePassword: string, hashedPassword: string) {}
  hashPassword(hashPassword: string) {}
}

export const UsersHelpers = new UsersHelpersClass();
