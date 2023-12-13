/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { IsNull, Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepo: Repository<Comment>,
  ) {}
  async create(
    body: string,
    username: string,
    post: Post,
    author: User,
    commentParentId: Comment | null,
  ) {
    const comment = this.CommentRepo.create({
      body,
      username,
      post,
      author,
      commentParentId,
    });
    console.log('comment', comment);
    if (commentParentId) {
      commentParentId.hasReplays = true;
      await this.CommentRepo.save(commentParentId);
    }
    return await this.CommentRepo.save(comment);
  }
  async getById(id: number, relations: string[] = []) {
    const comment = await this.CommentRepo.findOne({
      where: { id },
      relations,
    });
    if (!comment)
      throw new HttpException(
        'The comment was not found',
        HttpStatus.NOT_FOUND,
      );
    return comment;
  }
  async getByPostIdAndPage(postId: number, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.CommentRepo.find({
      where: { post: { id: postId }, commentParentId: IsNull() },
      skip,
      take: pageSize,
    });
  }
  async increaseRoughNumberOfLikes(comment: Comment) {
    comment.roughNumberOfLikes++;
    return await this.CommentRepo.save(comment);
  }
  async getReplaysByPostIdAndCommentIdAndPage(
    postId: number,
    commentId: Comment,
    page: number,
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.CommentRepo.find({
      where: { post: { id: postId }, commentParentId: commentId },
      skip,
      take: pageSize,
    });
  }
}
