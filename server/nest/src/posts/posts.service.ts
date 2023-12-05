import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly PostRepo: Repository<Post>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}
  async create(createPostDto: CreatePostDto, authorId: number) {
    const newPost = this.PostRepo.create(createPostDto);
    newPost.author = await this.UserRepo.findOneByOrFail({ id: authorId });
    await this.PostRepo.save(newPost);
    delete newPost.author.email;
    delete newPost.author.password;
    return newPost;
  }
  async getByPostId(postId: number) {
    const post = await this.PostRepo.findOneBy({ id: postId });
    if (!post)
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    return post;
  }
  async getByPage(page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await this.PostRepo.find({ skip, take: pageSize });
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

  async update(postId: number, data: UpdatePostDto, authorId: number) {
    const post = await this.PostRepo.findOne({
      where: { author: { id: authorId }, id: postId },
    });
    if (!post)
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    console.log(post);
    Object.assign(post, data);
    return await this.PostRepo.save(post);
  }
  async getAuthorByPostId(postId: number) {
    const post = await this.PostRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post)
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    return { id: post.author.id, username: post.author.username };
  }
}
