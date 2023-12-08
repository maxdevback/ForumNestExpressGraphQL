import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CommentsRepository } from './comments.repository';
import { PostsRepositoryV1_2 } from 'src/posts/posts.repository.v1.2';
import { CommentsRepositoryV1_2 } from './comments.repository.v1.2';
import { UsersRepositoryV1_2 } from 'src/users/users.repository.v1.2';
import { NotificationsRepositoryV1_2 } from 'src/notifications/notifications.repository.v1.2';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly commentRepositoryV1_2: CommentsRepositoryV1_2,
    private readonly postRepository: PostsRepository,
    private readonly postRepositoryV1_2: PostsRepositoryV1_2,
    private readonly userRepository: UsersRepository,
    private readonly userRepositoryV1_2: UsersRepositoryV1_2,
    private readonly notificationRepository: NotificationsRepository,
    private readonly notificationRepositoryV1_2: NotificationsRepositoryV1_2,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    authorId: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      const post = await this.postRepository.getById(postId);
      const parentComment = createCommentDto.commentParentId
        ? await this.commentRepository.getById(
            createCommentDto.commentParentId,
            ['author'],
          )
        : null;
      const author = await this.userRepository.findById(authorId);
      if (createCommentDto.commentParentId) {
        await this.notificationRepository.create(
          'Someone replied to your comment',
          parentComment.author,
        );
        createCommentDto.body =
          `$@{parentComment.author.username}` + createCommentDto.body;
      }
      const newComment = await this.commentRepository.create(
        createCommentDto.body,
        author.username,
        post,
        author,
        parentComment,
      );
      return { id: newComment.id };
    } else if (version === 'v1.2') {
      const post = await this.postRepositoryV1_2.getById(postId);
      const parentComment = createCommentDto.commentParentId
        ? await this.commentRepositoryV1_2.getById(
            createCommentDto.commentParentId,
          )
        : null;
      const author = await this.userRepositoryV1_2.findById(authorId);
      if (createCommentDto.commentParentId) {
        await this.notificationRepositoryV1_2.create(
          'Someone replied to your comment',
          parentComment.author,
        );
        createCommentDto.body =
          `$@{parentComment.author.username}` + createCommentDto.body;
      }
      const newComment = await this.commentRepositoryV1_2.create(
        createCommentDto.body,
        author.username,
        post,
        author,
        parentComment,
      );
      return { id: newComment.id };
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByPostIdAndPage(
    postId: number,
    page: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      return await this.commentRepository.getByPostIdAndPage(postId, page);
    } else if (version === 'v1.2') {
      return await this.commentRepositoryV1_2.getByPostIdAndPage(postId, page);
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getReplaysByPostIdAndCommentIdAndPage(
    postId: number,
    commentId: number,
    page: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      return await this.commentRepository.getReplaysByPostIdAndCommentIdAndPage(
        postId,
        await this.commentRepository.getById(commentId),
        page,
      );
    } else if (version === 'v1.2') {
      return await this.commentRepositoryV1_2.getReplaysByPostIdAndCommentIdAndPage(
        postId,
        await this.commentRepositoryV1_2.getById(commentId),
        page,
      );
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
