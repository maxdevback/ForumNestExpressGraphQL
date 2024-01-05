import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersRepositoryV1_2 } from './users.repository.v1.2';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly userRepositoryV1_2: UsersRepositoryV1_2,
  ) {}
  // TODO: Create auth module

  async delete(id: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.userRepository.deleteById(id);
    } else if (version === 'v1.2') {
      return await this.userRepositoryV1_2.deleteById(id);
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
