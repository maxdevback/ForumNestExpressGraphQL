/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesRepositoryV1_2 {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async createForPost(postId: number, authorId: number) {
    const query = `
      INSERT INTO like(entityType, postId, authorId)
      VALUES ('post', $1, $2)
      RETURNING *
    `;
    const parameters = [postId, authorId];
    const result = await this.likeRepository.query(query, parameters);

    return result[0];
  }

  async createForComment(commentId: number, authorId: number) {
    const query = `
      INSERT INTO like(entityType, commentId, authorId)
      VALUES ('comment', $1, $2)
      RETURNING *
    `;
    const parameters = [commentId, authorId];
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
