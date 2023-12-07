import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { LikesRepository } from './likes.repository';
import { CommentsRepository } from 'src/comments/comments.repository';
import { NotificationsRepository } from 'src/notifications/notifications.repository';

@Injectable()
export class LikesService {
  constructor(
    private readonly notificationRepo: NotificationsRepository,
    private readonly commentRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly likesRepository: LikesRepository,
  ) {}

  async likePost(postId: number, authorId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const post = await this.postsRepository.getById(postId, ['author']);
      if (post.author.id === authorId)
        throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);

      await this.notificationRepo.create(
        'Someone liked your post',
        post.author,
      );
      const author = await this.usersRepository.findById(authorId);
      await this.likesRepository.createForPost(post, author);
      await this.postsRepository.increaseRoughNumberOfLikes(post);
      return post;
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async likeComment(
    commentId: number,
    authorId: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      const comment = await this.commentRepository.getById(commentId, [
        'author',
      ]);
      if (comment.author.id === authorId)
        throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);

      await this.notificationRepo.create(
        'Someone liked your comment',
        comment.author,
      );

      const author = await this.usersRepository.findById(authorId);
      await this.likesRepository.createForComment(comment, author);
      return await this.commentRepository.increaseRoughNumberOfLikes(comment);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async isLikedEntity(
    entityId: number,
    type: 'post' | 'comment',
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      return !!(await this.likesRepository.isLikedEntityById(type, entityId));
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
