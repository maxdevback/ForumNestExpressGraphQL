import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment, Notification])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
