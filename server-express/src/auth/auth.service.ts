import { BadRequestException } from '../model/exceptions/bad-request.exception';
import { ConflictException } from '../model/exceptions/conflict.exception';
import { NotFoundException } from '../model/exceptions/not-found.exception';
import { UsersRepository } from '../users/users.repository';
import { AuthHelpers } from './auth.helpers';
import { ILogin, IRegister } from './auth.interfaces';

class AuthServiceClass {
  async register(data: IRegister) {
    const hashedPassword = await AuthHelpers.hashPassword(data.password);
    if (
      await UsersRepository.findUserByUsernameOrEmailOld(
        data.username,
        data.email,
      )
    )
      throw new ConflictException(
        'A user with that username or email already exists.',
      );
    const user = await UsersRepository.create(
      data.username,
      data.email,
      hashedPassword,
    );
    return { _id: user._id, username: user.username };
  }
  async loginOld(data: ILogin) {
    const user = await UsersRepository.findUserByUsernameOld(data.username);
    if (!user)
      throw new NotFoundException('The user with this username is not found');
    if (await AuthHelpers.comparePassword(data.password, user.password)) {
      return { _id: user._id, username: user.username };
    } else {
      throw new BadRequestException('The password is wrong');
    }
  }
  async login(data: ILogin) {
    const user = await UsersRepository.findUserByUsername(data.username);
    if (!user)
      throw new NotFoundException('The user with this username is not found');
    if (await AuthHelpers.comparePassword(data.password, user.password)) {
      return { _id: user._id, username: user.username };
    } else {
      throw new BadRequestException('The password is wrong');
    }
  }
}

export const AuthService = new AuthServiceClass();
