import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { CommentsRepository } from './comments.repository';
import { CommentsRepositoryV1_2 } from './comments.repository.v1.2';
import { CommentsControllerV1_2 } from './comments.controller.v1.1';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostsRepositoryV1_2 } from 'src/posts/posts.repository.v1.2';
import { UsersRepository } from 'src/users/users.repository';
import { UsersRepositoryV1_2 } from 'src/users/users.repository.v1.2';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { NotificationsRepositoryV1_2 } from 'src/notifications/notifications.repository.v1.2';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment, Notification])],
  controllers: [CommentsController, CommentsControllerV1_2],
  providers: [
    CommentsService,
    CommentsRepository,
    CommentsRepositoryV1_2,
    PostsRepository,
    PostsRepositoryV1_2,
    UsersRepository,
    UsersRepositoryV1_2,
    NotificationsRepository,
    NotificationsRepositoryV1_2,
  ],
})
export class CommentsModule {}
