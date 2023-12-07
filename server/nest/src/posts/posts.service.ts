import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(
    createPostDto: CreatePostDto,
    authorId: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      const user = await this.usersRepository.findById(authorId);
      return await this.postsRepository.create(createPostDto, user);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByPostId(postId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.postsRepository.getById(postId);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByPage(page: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.postsRepository.getByPage(page);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMyByPage(page: number, authorId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.postsRepository.getMyByPage(page, authorId);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    postId: number,
    data: UpdatePostDto,
    authorId: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      return await this.postsRepository.updateById(postId, authorId, data);
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAuthorByPostId(postId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const author = await this.postsRepository.getAuthorById(postId);
      return { id: author.id, username: author.username };
    } else if (version === 'v1.2') {
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
