import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { NotificationsControllerV1_2 } from './notifications.controller.v1.2';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsRepositoryV1_2 } from './notifications.repository.v1.2';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
  controllers: [NotificationsController, NotificationsControllerV1_2],
  providers: [
    NotificationsService,
    NotificationsRepository,
    NotificationsRepositoryV1_2,
    UsersRepository,
  ],
})
export class NotificationsModule {}
