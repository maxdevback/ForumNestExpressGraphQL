import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, Notification, Like, User]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
