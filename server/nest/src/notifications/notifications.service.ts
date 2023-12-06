import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly NotificationRepo: Repository<Notification>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}
  async getMyPage(page: number, receiverId: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    const receiver = await this.UserRepo.findOne({ where: { id: receiverId } });
    return await this.NotificationRepo.find({
      where: { receiverId: receiver },
      skip,
      take: pageSize,
    });
  }
}
