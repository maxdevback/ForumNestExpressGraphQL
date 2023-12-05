import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [PostsModule, UsersModule, CommentsModule, LikesModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
