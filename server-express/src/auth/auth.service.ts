import UsersExceptions from "../users/users.exceptions";
import { UsersRepository } from "../users/users.repository";
import AuthExceptions from "./auth.exceptions";
import { AuthHelpers } from "./auth.helpers";
import { ILogin, IRegister } from "./auth.interfaces";

class AuthServiceClass {
  async registerOld(data: IRegister) {
    const hashedPassword = await AuthHelpers.hashPassword(data.password);
    if (
      await UsersRepository.findUserByUsernameOrEmailOld(
        data.username,
        data.email
      )
    )
      throw AuthExceptions.alreadyExist();
    const user = await UsersRepository.create(
      data.username,
      data.email,
      hashedPassword
    );
    return { _id: user._id, username: user.username };
  }
  async loginOld(data: ILogin) {
    const user = await UsersRepository.findUserByUsernameOld(data.username);
    if (!user)
      throw UsersExceptions.NotFound(
        "The user with this username is not found"
      );
    if (await AuthHelpers.comparePassword(data.password, user.password)) {
      return { _id: user._id, username: user.username };
    } else {
      throw AuthExceptions.wrongPassword();
    }
  }
  async login(data: ILogin) {
    const user = await UsersRepository.findUserByUsername(data.username);
    if (!user)
      throw UsersExceptions.NotFound(
        "The user with that username was not found"
      );
    if (await AuthHelpers.comparePassword(data.password, user.password)) {
      return { _id: user._id, username: user.username };
    } else {
      throw AuthExceptions.wrongPassword();
    }
  }
}

export const AuthService = new AuthServiceClass();
