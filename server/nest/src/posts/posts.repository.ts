/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly PostRepo: Repository<Post>,
  ) {}
  async create(data: CreateCommentDto, author: User) {
    const newPost = this.PostRepo.create(data);
    newPost.author = author;
    await this.PostRepo.save(newPost);
    delete newPost.author;
    return newPost;
  }
  async getById(id: number, relations: string[] = []) {
    const post = await this.PostRepo.findOne({ where: { id }, relations });
    if (!post)
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    return post;
  }
  async getByPage(page: number, relations: string[] = []) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.PostRepo.find({ skip, take: pageSize, relations });
  }
  async getMyByPage(page: number, authorId: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.PostRepo.find({
      where: { author: { id: authorId } },
      skip,
      take: pageSize,
    });
  }
  async updateById(postId: number, authorId: number, newData: Partial<Post>) {
    const post = await this.PostRepo.findOne({
      where: { author: { id: authorId }, id: postId },
    });
    if (!post)
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    Object.assign(post, newData);
    return await this.PostRepo.save(post);
  }
  async getAuthorById(id: number) {
    const post = await this.PostRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post)
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    return post.author;
  }
  async increaseRoughNumberOfLikes(post: Post) {
    post.roughNumberOfLikes++;
    return await this.PostRepo.save(post);
  }
}
