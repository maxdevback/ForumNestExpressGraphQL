import { hash, compare } from "bcrypt";
import { UsersRepository } from "./users.repository";
import { UsersRepository_v1_2 } from "./users.repository.v1.2";
import { UsersExceptions } from "./users.exceptions";
import { IRegister } from "./users.intefaces";
import { UsersHelpers } from "./users.heplers";

class UsersServiceClass {
  async register(data: IRegister) {
    const hashedPassword = await UsersHelpers.hashPassword(data.password);
    //TODO:
    if (data.v === "v1.1") {
      try {
        await UsersRepository.getUserByUserByUsernameOrEmail(
          data.username,
          data.email
        );
        throw UsersExceptions.alreadyExist();
      } catch (err: any) {
        if (err.httpCode !== 404) throw err;
        const user = await UsersRepository.create(
          data.username,
          data.email,
          hashedPassword
        );
        return { _id: user._id, username: user.username };
      }
    } else {
      try {
        await UsersRepository_v1_2.getByUsernameOrEmail(
          data.username,
          data.email
        );
        throw UsersExceptions.alreadyExist();
      } catch (err: any) {
        if (err.httpCode !== 404) throw err;
        const user = await UsersRepository_v1_2.create(
          data.username,
          data.email,
          hashedPassword
        );
        return { _id: user._id, username: user.username };
      }
    }
  }
  async login(username: string, password: string, v: "v1.1" | "v1.2" = "v1.1") {
    if (v === "v1.1") {
      try {
        const user = await UsersRepository.getUserByUsername(username);
        if (await UsersHelpers.comparePassword(password, user.password)) {
          return { _id: user._id, username: user.username };
        } else {
          throw UsersExceptions.wrongPassword();
        }
      } catch (err) {
        console.log(err);
        throw UsersExceptions.NotFound("The user with that info doesn't exist");
      }
    } else {
      try {
        const user = await UsersRepository_v1_2.getUserByUsername(username);
        if (await UsersHelpers.comparePassword(password, user.password)) {
          return { _id: user.id, username: user.username };
        } else {
          throw UsersExceptions.wrongPassword();
        }
      } catch (err) {
        throw UsersExceptions.NotFound("The user with that info doesn't exist");
      }
    }
  }
  async deleteAccount(id: string, v: "v1.1" | "v1.2" = "v1.1") {
    return v === "v1.1"
      ? await UsersRepository.deleteAccount(id)
      : await UsersRepository_v1_2.deleteAccount(id);
  }
}

export const UsersService = new UsersServiceClass();
