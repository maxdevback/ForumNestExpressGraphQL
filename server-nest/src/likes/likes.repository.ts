/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class LikesRepository {
  constructor(
    @InjectRepository(Like) private readonly LikeRepo: Repository<Like>,
  ) {}
  async createForPost(post: Post, author: User) {
    const like = this.LikeRepo.create({
      entityType: 'post',
      post,
      author,
    });
    return await this.LikeRepo.save(like);
  }
  async createForComment(comment: Comment, author: User) {
    const like = this.LikeRepo.create({
      entityType: 'comment',
      comment,
      author,
    });
    return await this.LikeRepo.save(like);
  }
  async isLikedEntityById(type: 'comment' | 'post', id: number) {
    return !!(await this.LikeRepo.find({
      where: {
        entityType: type,
        comment: type === 'comment' ? { id } : null,
        post: type === 'post' ? { id } : null,
      },
    }));
  }
}
