import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async getMyPage(page: number, receiverId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const receiver = await this.userRepository.findById(receiverId);
      return await this.notificationsRepository.getMyByPage(page, receiver);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
