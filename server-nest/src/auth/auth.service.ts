import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UsersRepositoryV1_2 } from 'src/users/users.repository.v1.2';
import { AuthHelpers } from './auth.helpers';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersRepositoryV1_2: UsersRepositoryV1_2,

    private readonly authHelpers: AuthHelpers,
  ) {}

  async loginOld(data: LoginUserDto) {
    const user = await this.usersRepository.findByUsernameOrEmail(
      data.username,
      '',
    );
    if (
      !(await this.authHelpers.comparePasswords(data.password, user.password))
    ) {
      throw new HttpException(
        'Incorrect username and password combination',
        HttpStatus.NOT_FOUND,
      );
    }
    return { username: data.username, id: user.id };
  }

  async login(data: LoginUserDto) {
    const user = await this.usersRepositoryV1_2.findByUsernameOrEmail(
      data.username,
      '',
    );
    if (
      !(await this.authHelpers.comparePasswords(data.password, user.password))
    ) {
      throw new HttpException(
        'Incorrect username and password combination',
        HttpStatus.NOT_FOUND,
      );
    }
    return { username: data.username, id: user.id };
  }

  async registerOld(data: RegisterUserDto) {
    const user = await this.usersRepository.findByUsernameOrEmail(
      data.username,
      data.password,
    );
    if (user) {
      throw new HttpException(
        'User with that email or username already exists',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await this.authHelpers.hashPassword(data.password);
    const newUser = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });
    return { username: newUser.username, id: newUser.id };
  }

  async register(data: RegisterUserDto) {
    const user = await this.usersRepositoryV1_2.findByUsernameOrEmail(
      data.username,
      data.password,
    );
    if (user) {
      throw new HttpException(
        'User with that email or username already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this.authHelpers.hashPassword(data.password);
    const newUser = await this.usersRepositoryV1_2.create({
      ...data,
      password: hashedPassword,
    });

    return { username: newUser.username, id: newUser.id };
  }
}
