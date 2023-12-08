import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { PostsRepositoryV1_2 } from './posts.repository.v1.2';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly postRepositoryV1_2: PostsRepositoryV1_2,
    private readonly userRepository: UsersRepository,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    authorId: number,
    version: string = 'v1.1',
  ) {
    if (version === 'v1.1') {
      const user = await this.userRepository.findById(authorId);
      return await this.postRepository.create(createPostDto, user);
    } else if (version === 'v1.2') {
      return await this.postRepositoryV1_2.create(createPostDto, authorId);
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByPostId(postId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.postRepository.getById(postId);
    } else if (version === 'v1.2') {
      return await this.postRepositoryV1_2.getById(postId);
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getByPage(page: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.postRepository.getByPage(page);
    } else if (version === 'v1.2') {
      return await this.postRepositoryV1_2.getByPage(page);
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMyByPage(page: number, authorId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      return await this.postRepository.getMyByPage(page, authorId);
    } else if (version === 'v1.2') {
      return await this.postRepositoryV1_2.getMyByPage(page, authorId);
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
      return await this.postRepository.updateById(postId, authorId, data);
    } else if (version === 'v1.2') {
      return await this.postRepositoryV1_2.updateById(postId, authorId, data);
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAuthorByPostId(postId: number, version: string = 'v1.1') {
    if (version === 'v1.1') {
      const author = await this.postRepository.getAuthorById(postId);
      return { id: author.id, username: author.username };
    } else if (version === 'v1.2') {
      const author = await this.postRepositoryV1_2.getAuthorById(postId);
      return { id: author.id, username: author.username };
    } else {
      throw new HttpException(
        'Invalid version specified',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
