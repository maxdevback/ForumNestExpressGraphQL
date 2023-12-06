/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}
  async findByUsernameOrEmail(
    username: string,
    email: string,
    throwError: boolean = true,
  ) {
    const user = await this.UserRepo.findOne({
      where: [{ username: username }, { email: email }],
    });
    if (!user && throwError)
      throw new HttpException(
        'No user with this username was found',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  async create(userInfo: {
    username: string;
    password: string;
    email: string;
  }) {
    const newUserEntity = this.UserRepo.create(userInfo);
    return await this.UserRepo.save(newUserEntity);
  }
  async deleteById(id: number) {
    await this.UserRepo.delete({ id });
    return new HttpException('Deleted', HttpStatus.OK);
  }
  async findById(id: number) {
    const user = await this.UserRepo.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        'No user with this username was found',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
}
