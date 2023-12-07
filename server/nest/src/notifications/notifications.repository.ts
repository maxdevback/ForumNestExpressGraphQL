/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly NotificationRepo: Repository<Notification>,
  ) {}
  async getMyByPage(page: number, receiver: User) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.NotificationRepo.find({
      where: { receiverId: receiver },
      skip,
      take: pageSize,
    });
  }
  async create(body: string, receiverId: User) {
    const notification = await this.NotificationRepo.create({
      body,
      receiverId,
    });
    return await this.NotificationRepo.save(notification);
  }
}
