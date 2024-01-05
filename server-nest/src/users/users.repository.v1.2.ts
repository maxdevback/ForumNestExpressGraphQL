/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepositoryV1_2 {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async findByUsernameOrEmail(username: string, email: string) {
    const query = `
      SELECT * FROM "user"
      WHERE username = $1 OR email = $2
    `;
    const parameters = [username, email];
    const user = await this.UserRepo.query(query, parameters);

    return user[0];
  }

  async create(userInfo: {
    username: string;
    password: string;
    email: string;
  }) {
    const query = `
      INSERT INTO user(username, password, email)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const parameters = [userInfo.username, userInfo.password, userInfo.email];
    const newUser = await this.UserRepo.query(query, parameters);

    return newUser[0];
  }

  async deleteById(id: number) {
    const query = `
      DELETE FROM "user"
      WHERE id = $1
    `;
    const parameters = [id];
    await this.UserRepo.query(query, parameters);

    return new HttpException('Deleted', HttpStatus.OK);
  }

  async findById(id: number) {
    const query = `
      SELECT * FROM "user"
      WHERE id = $1
    `;
    const parameters = [id];
    const user = await this.UserRepo.query(query, parameters);

    if (!user.length) {
      throw new HttpException(
        'No user with this username was found',
        HttpStatus.NOT_FOUND,
      );
    }

    return user[0];
  }
}
