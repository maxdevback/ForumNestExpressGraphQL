import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { LikesRepository } from './likes.repository';
import { CommentsRepository } from 'src/comments/comments.repository';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { PostsRepositoryV1_2 } from 'src/posts/posts.repository.v1.2';
import { LikesRepositoryV1_2 } from './likes.repository.v1.2';
import { CommentsRepositoryV1_2 } from 'src/comments/comments.repository.v1.2';
import { NotificationsRepositoryV1_2 } from 'src/notifications/notifications.repository.v1.2';

@Injectable()
export class LikesService {
  constructor(
    private readonly notificationRepository: NotificationsRepository,
    private readonly notificationRepositoryV1_2: NotificationsRepositoryV1_2,
    private readonly commentRepository: CommentsRepository,
    private readonly commentRepositoryV1_2: CommentsRepositoryV1_2,
    private readonly postRepository: PostsRepository,
    private readonly postRepositoryV1_2: PostsRepositoryV1_2,
    private readonly userRepository: UsersRepository,
    private readonly likeRepository: LikesRepository,
    private readonly likeRepositoryV1_2: LikesRepositoryV1_2,
  ) {}

  async likePost(postId: number, authorId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const post = await this.postRepository.getById(postId, ['author']);
      if (post.author.id === authorId)
        throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);
      const author = await this.userRepository.findById(authorId);
      const isLikedEntity = await this.likeRepository.isLikedEntityById(
        'post',
        postId,
        author,
      );
      console.log(isLikedEntity);
      if (isLikedEntity)
        throw new HttpException('You already liked it', HttpStatus.CONFLICT);
      await this.notificationRepository.create(
        'Someone liked your post',
        post.author,
      );
      await this.likeRepository.createForPost(post, author);
      await this.postRepository.increaseRoughNumberOfLikes(post);
      delete post.author;
      return post;
    } else if (version === 'v1.2') {
      const post = await this.postRepositoryV1_2.getById(postId);
      //const author = this.userRepositoryV1_2.findById(authorId);
      if (post.author.id === authorId)
        throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);
      await this.likeRepositoryV1_2.createForPost(post.id, authorId);
      await this.postRepositoryV1_2.increaseRoughNumberOfLikes(post.id);
      return post;
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

      await this.notificationRepository.create(
        'Someone liked your comment',
        comment.author,
      );
      delete comment.author;
      const author = await this.userRepository.findById(authorId);
      await this.likeRepository.createForComment(comment, author);
      return await this.commentRepository.increaseRoughNumberOfLikes(comment);
    } else if (version === 'v1.2') {
      const comment = await this.commentRepositoryV1_2.getById(commentId);
      if (comment.authorId === authorId)
        throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);
      await this.likeRepositoryV1_2.createForComment(comment.id, authorId);
      await this.notificationRepositoryV1_2.create(
        'Someone liked your comment',
        authorId,
      );
      return await this.commentRepositoryV1_2.increaseRoughNumberOfLikes(
        commentId,
      );
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
    authorId: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      const author = await this.userRepository.findById(authorId);
      return !!(await this.likeRepository.isLikedEntityById(
        type,
        entityId,
        author,
      ));
    } else if (version === 'v1.2') {
      return !!(await this.likeRepositoryV1_2.isLikedEntityById(
        type,
        entityId,
      ));
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
