/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class LikesRepository {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async createForPost(post: Post, author: User) {
    const query = `
      INSERT INTO like(entityType, postId, authorId)
      VALUES ('post', $1, $2)
      RETURNING *
    `;
    const parameters = [post.id, author.id];
    const result = await this.likeRepository.query(query, parameters);

    return result[0];
  }

  async createForComment(comment: Comment, author: User) {
    const query = `
      INSERT INTO like(entityType, commentId, authorId)
      VALUES ('comment', $1, $2)
      RETURNING *
    `;
    const parameters = [comment.id, author.id];
    const result = await this.likeRepository.query(query, parameters);

    return result[0];
  }

  async isLikedEntityById(type: 'comment' | 'post', id: number) {
    const query = `
      SELECT * FROM like
      WHERE entityType = $1 AND ${
        type === 'comment' ? 'commentId' : 'postId'
      } = $2
    `;
    const parameters = [type, id];
    const likes = await this.likeRepository.query(query, parameters);

    return !!likes.length;
  }
}
