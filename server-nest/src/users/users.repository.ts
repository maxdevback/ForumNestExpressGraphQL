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
  async findByUsernameOrEmail(username: string, email: string) {
    return await this.UserRepo.findOne({
      where: [{ username: username }, { email: email }],
    });
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
    return await this.UserRepo.findOne({ where: { id } });
  }
}
