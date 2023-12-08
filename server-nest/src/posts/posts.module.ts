import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { PostsControllerV1_2 } from './posts.controller.v1.2';
import { PostsRepositoryV1_2 } from './posts.repository.v1.2';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostsController, PostsControllerV1_2],
  providers: [
    PostsService,
    PostsRepository,
    UsersRepository,
    PostsRepositoryV1_2,
  ],
})
export class PostsModule {}
