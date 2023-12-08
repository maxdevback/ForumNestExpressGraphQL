import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { LikesControllerV1_2 } from './likes.controller.v1.2';
import { LikesRepository } from './likes.repository';
import { LikesRepositoryV1_2 } from './likes.repository.v1.2';
import { CommentsRepository } from 'src/comments/comments.repository';
import { CommentsRepositoryV1_2 } from 'src/comments/comments.repository.v1.2';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostsRepositoryV1_2 } from 'src/posts/posts.repository.v1.2';
import { UsersRepository } from 'src/users/users.repository';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { NotificationsRepositoryV1_2 } from 'src/notifications/notifications.repository.v1.2';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, Notification, Like, User]),
  ],
  controllers: [LikesController, LikesControllerV1_2],
  providers: [
    LikesService,
    LikesRepository,
    LikesRepositoryV1_2,
    CommentsRepository,
    CommentsRepositoryV1_2,
    PostsRepository,
    PostsRepositoryV1_2,
    UsersRepository,
    NotificationsRepository,
    NotificationsRepositoryV1_2,
  ],
})
export class LikesModule {}
