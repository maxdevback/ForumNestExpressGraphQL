import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash, compare } from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(data: RegisterUserDto, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const user = await this.usersRepository.findByUsernameOrEmail(
        data.username,
        data.password,
        false,
      );
      if (user)
        throw new HttpException(
          'User with that email or username already exists',
          HttpStatus.CONFLICT,
        );

      const hashedPassword = await hash(data.password, 15);
      const newUser = await this.usersRepository.create({
        ...data,
        password: hashedPassword,
      });

      return { username: newUser.username, id: newUser.id };
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(data: LoginUserDto, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const user = await this.usersRepository.findByUsernameOrEmail(
        data.username,
        '',
      );

      if (!(await compare(data.password, user.password)))
        throw new HttpException(
          'Incorrect username and password combination',
          HttpStatus.NOT_FOUND,
        );

      return { username: data.username, id: user.id };
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.usersRepository.deleteById(id);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
