/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getMyByPage(page: number, receiver: User) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    const query = `
      SELECT * FROM notification
      WHERE receiverId = $1
      OFFSET $2 LIMIT $3
    `;
    const parameters = [receiver.id, skip, pageSize];
    const notifications = await this.notificationRepository.query(
      query,
      parameters,
    );

    return notifications;
  }

  async create(body: string, receiver: User) {
    const query = `
      INSERT INTO notification(body, receiverId)
      VALUES ($1, $2)
      RETURNING *
    `;
    const parameters = [body, receiver.id];
    const result = await this.notificationRepository.query(query, parameters);

    return result[0];
  }
}
