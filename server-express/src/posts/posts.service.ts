import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';
import { NotFoundException } from '../model/exceptions/not-found.exception';
import { joiValidateObjectId } from '../shared/validators/joi.validate.objectid';

class PostsServiceClass {
  async create(title: string, body: string, authorId: string) {
    return await PostsRepository.create(title, body, authorId);
  }

  async getByPageOld(page: number) {
    return await PostsRepository.getByPageOld(page);
  }

  async getByPage(page: number) {
    return await PostsRepository.getByPage(page);
  }

  async getByAuthorAndPageOld(authorId: string, page: number) {
    joiValidateObjectId(authorId);
    return await PostsRepository.getByAuthorAndPageOld(authorId, page);
  }

  async getByAuthorAndPage(authorId: string, page: number) {
    return await PostsRepository.getByAuthorAndPage(authorId, page);
  }

  async getByPostIdOld(postId: string) {
    joiValidateObjectId(postId);
    const post = await PostsRepository.getByPostIdOld(postId);
    if (!post) {throw new NotFoundException("This post doesn't exist");}
    return post;
  }

  async getByPostId(postId: string) {
    joiValidateObjectId(postId);
    const post = await PostsRepository.getByPostId(postId);
    if (!post) {throw new NotFoundException("This post doesn't exist");}
    return post;
  }

  async getAuthorByPostIdOld(postId: string) {
    joiValidateObjectId(postId);
    const post = await PostsRepository.getByPostIdOld(postId);
    if (!post) {throw new NotFoundException("This post doesn't exist");}
    const user = await UsersRepository.findUserByIdOld(postId);
    if (!user) {throw new NotFoundException('Author of the post not found');}
    return { _id: user._id, username: user.username };
  }

  async getAuthorByPostId(postId: string) {
    const post = await PostsRepository.getByPostId(postId);
    if (!post) {throw new NotFoundException("This post doesn't exist");}
    const user = await UsersRepository.findUserById(post.authorId);
    if (!user) {throw new NotFoundException('Author of the post not found');}
    return { _id: user._id, username: user.username };
  }

  async updateByPostIdAndAuthorId(
    postId: string,
    authorId: string,
    newData: object,
  ) {
    joiValidateObjectId(postId);
    joiValidateObjectId(authorId);
    await PostsRepository.updateByPostIdAndAuthorId(postId, authorId, newData);
  }
}

export const PostsService = new PostsServiceClass();
