import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { UsersRepository } from 'src/users/users.repository';
import { NotificationsRepositoryV1_2 } from './notifications.repository.v1.2';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly notificationsRepositoryV1_2: NotificationsRepositoryV1_2,
    private readonly userRepository: UsersRepository,
  ) {}

  async getMyPage(page: number, receiverId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const receiver = await this.userRepository.findById(receiverId);
      return await this.notificationsRepository.getMyByPage(page, receiver);
    } else if (version === 'v1.2') {
      return await this.notificationsRepositoryV1_2.getMyByPage(
        page,
        receiverId,
      );
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
