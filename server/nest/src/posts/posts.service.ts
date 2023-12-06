import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(createPostDto: CreatePostDto, authorId: number) {
    const user = await this.usersRepository.findById(authorId);
    return await this.postsRepository.create(createPostDto, user);
  }
  async getByPostId(postId: number) {
    return await this.postsRepository.getById(postId);
  }
  async getByPage(page: number) {
    return await this.postsRepository.getByPage(page);
  }
  async getMyByPage(page: number, authorId: number) {
    return await this.postsRepository.getMyByPage(page, authorId);
  }

  async update(postId: number, data: UpdatePostDto, authorId: number) {
    return await this.postsRepository.updateById(postId, authorId, data);
  }
  async getAuthorByPostId(postId: number) {
    const author = await this.postsRepository.getAuthorById(postId);
    return { id: author.id, username: author.username };
  }
}
