import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotificationsRepository } from 'src/notifications/notifications.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly postRepository: PostsRepository,
    private readonly userRepository: UsersRepository,
    private readonly notificationRepository: NotificationsRepository,
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
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
