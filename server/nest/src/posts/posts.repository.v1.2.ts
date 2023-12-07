/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(data: CreatePostDto, author: User) {
    const query = `
      INSERT INTO post(title, body, authorId)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const parameters = [data.title, data.body, author.id];
    const post = await this.postRepository.query(query, parameters);

    return post[0];
  }

  async getById(id: number) {
    const query = `
      SELECT * FROM post
      WHERE id = $1
    `;
    const parameters = [id];
    const post = await this.postRepository.query(query, parameters);

    if (!post.length) {
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async getByPage(page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    const query = `
      SELECT * FROM post
      OFFSET $1 LIMIT $2
    `;
    const parameters = [skip, pageSize];
    const posts = await this.postRepository.query(query, parameters);

    return posts;
  }

  async getMyByPage(page: number, authorId: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    const query = `
      SELECT * FROM post
      WHERE authorId = $1
      OFFSET $2 LIMIT $3
    `;
    const parameters = [authorId, skip, pageSize];
    const posts = await this.postRepository.query(query, parameters);

    return posts;
  }

  async updateById(postId: number, authorId: number, newData: Partial<Post>) {
    const queryWithTitleAndBody = `
      UPDATE post
      SET body = $1, title = $2
      WHERE id = $3 AND authorId = $4
      RETURNING *
    `;
    const queryWithTitle = `
      UPDATE post
      SET title = $1
      WHERE id = $2 AND authorId = $3
      RETURNING *
    `;
    const queryWithBody = `
      UPDATE post
      SET body = $1
      WHERE id = $2 AND authorId = $3
      RETURNING *
    `;
    let result;
    if (newData.title && newData.body) {
      result = await this.postRepository.query(queryWithTitleAndBody, [
        newData.body,
        newData.title,
        newData.author,
      ]);
    } else if (newData.title) {
      result = await this.postRepository.query(queryWithTitle, [
        newData.title,
        authorId,
      ]);
    } else {
      result = await this.postRepository.query(queryWithBody, [
        newData.body,
        authorId,
      ]);
    }

    if (!result.length) {
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    }

    return result[0];
  }

  async getAuthorById(id: number) {
    const query = `
      SELECT u.* FROM post p
      INNER JOIN "user" u ON p.authorId = u.id
      WHERE p.id = $1
    `;
    const parameters = [id];
    const user = await this.postRepository.query(query, parameters);

    if (!user.length) {
      throw new HttpException('The post was not found', HttpStatus.NOT_FOUND);
    }

    return this.postRepository.create(user[0]);
  }

  async increaseRoughNumberOfLikes(post: Post) {
    const query = `
      UPDATE post
      SET roughNumberOfLikes = roughNumberOfLikes + 1
      WHERE id = $1
      RETURNING *
    `;
    const parameters = [post.id];
    const result = await this.postRepository.query(query, parameters);

    return result[0];
  }
}
