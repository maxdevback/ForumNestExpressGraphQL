import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private readonly LikeRepo: Repository<Like>,
    @InjectRepository(Notification)
    private readonly NotificationRepo: Repository<Notification>,
    @InjectRepository(Post) private readonly PostRepo: Repository<Post>,
    @InjectRepository(Comment)
    private readonly CommentRepo: Repository<Comment>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}
  async likePost(postId: number, authorId: number) {
    const post = await this.PostRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (post.author.id === authorId)
      throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);
    const newNotification = this.NotificationRepo.create({
      body: 'Someone liked your post',
      receiverId: post.author,
    });
    const author = await this.UserRepo.findOne({ where: { id: authorId } });
    const newLike = this.LikeRepo.create({
      entityType: 'post',
      post,
      author,
    });
    await this.LikeRepo.save(newLike);
    await this.NotificationRepo.save(newNotification);
    post.roughNumberOfLikes++;
    await this.PostRepo.save(post);
    return post;
  }

  async likeComment(commentId: number, authorId: number) {
    const comment = await this.CommentRepo.findOne({
      where: { id: commentId },
      relations: ['author'],
    });
    if (comment.author.id === authorId)
      throw new HttpException("You can't like yourself", HttpStatus.CONFLICT);
    const newNotification = this.NotificationRepo.create({
      body: 'Someone liked your comment',
      receiverId: comment.author,
    });
    const author = await this.UserRepo.findOne({ where: { id: authorId } });
    const newLike = this.LikeRepo.create({
      entityType: 'comment',
      comment,
      author: author,
    });
    await this.LikeRepo.save(newLike);
    await this.NotificationRepo.save(newNotification);
    comment.roughNumberOfLikes++;
    await this.CommentRepo.save(comment);
    return comment;
  }

  async isLikedEntity(entityId: number, type: 'post' | 'comment') {
    return !!(await this.LikeRepo.findOne({
      where: { entityType: type, comment: { id: entityId } },
    }));
  }
}
