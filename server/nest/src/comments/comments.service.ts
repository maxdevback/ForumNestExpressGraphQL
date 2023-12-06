import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { IsNull, Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepo: Repository<Comment>,
    @InjectRepository(Post) private readonly PostRepo: Repository<Post>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    @InjectRepository(Notification)
    private readonly NotificationRepo: Repository<Notification>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    authorId: number,
  ) {
    const post = await this.PostRepo.findOne({ where: { id: postId } });
    console.log(createCommentDto);
    const parentComment = createCommentDto.commentParentId
      ? await this.PostRepo.findOne({
          where: { id: createCommentDto.commentParentId },
          relations: ['author'],
        })
      : null;
    const author = await this.UserRepo.findOne({ where: { id: authorId } });
    if (createCommentDto.commentParentId) {
      const newNotification = this.NotificationRepo.create({
        body: 'Someone replied to your comment',
        receiverId: parentComment.author,
      });
      await this.NotificationRepo.save(newNotification);
      createCommentDto.body =
        `$@{parentComment.author.username}` + createCommentDto.body;
    }
    const newComment = this.CommentRepo.create({
      body: createCommentDto.body,
      username: author.username,
      post,
      author,
      parentCommentId: parentComment,
    });
    const savedComment = await this.CommentRepo.save(newComment);
    return { id: savedComment.id };
  }

  async getByPostIdAndPage(postId: number, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.CommentRepo.find({
      where: { post: { id: postId }, parentCommentId: IsNull() },
      skip,
      take: pageSize,
    });
  }

  async getReplaysByPostIdAndCommentIdAndPage(
    postId: number,
    commentId: number,
    page: number,
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.CommentRepo.find({
      where: { post: { id: postId }, parentCommentId: { id: commentId } },
      skip,
      take: pageSize,
    });
  }
}
