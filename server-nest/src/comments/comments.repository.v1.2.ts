/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsRepositoryV1_2 {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    body: string,
    username: string,
    post: Post,
    author: User,
    parentCommentId: Comment | null,
  ) {
    const query = `
      INSERT INTO comment(body, username, postId, authorId, parentCommentId)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const parameters = [
      body,
      username,
      post.id,
      author.id,
      parentCommentId?.id || null,
    ];
    const result = await this.commentRepository.query(query, parameters);

    return result[0];
  }

  async getById(id: number) {
    const query = `
      SELECT * FROM comment
      WHERE id = $1
    `;
    const parameters = [id];
    const comment = await this.commentRepository.query(query, parameters);

    if (!comment.length) {
      throw new HttpException(
        'The comment was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return comment[0];
  }

  async getByPostIdAndPage(postId: number, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    const query = `
      SELECT * FROM comment
      WHERE postId = $1 AND parentCommentId IS NULL
      OFFSET $2 LIMIT $3
    `;
    const parameters = [postId, skip, pageSize];
    const comments = await this.commentRepository.query(query, parameters);

    return comments;
  }

  async increaseRoughNumberOfLikes(commentId: number) {
    const query = `
      UPDATE comment
      SET roughNumberOfLikes = roughNumberOfLikes + 1
      WHERE id = $1
      RETURNING *
    `;
    const parameters = [commentId];
    const result = await this.commentRepository.query(query, parameters);

    return result[0];
  }

  async getReplaysByPostIdAndCommentIdAndPage(
    postId: number,
    commentId: Comment,
    page: number,
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    const query = `
      SELECT * FROM comment
      WHERE postId = $1 AND parentCommentId = $2
      OFFSET $3 LIMIT $4
    `;
    const parameters = [postId, commentId.id, skip, pageSize];
    const replies = await this.commentRepository.query(query, parameters);

    return replies;
  }
}
