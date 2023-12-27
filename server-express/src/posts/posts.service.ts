import { PostsRepository } from "./posts.repository";
import { UsersRepository } from "../users/users.repository";
import { Validate } from "../shared/validate";
import UsersExceptions from "../users/users.exceptions";
import PostsExceptions from "./posts.exceptions";

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
    Validate.validateObjectId(authorId);
    return await PostsRepository.getByAuthorAndPageOld(authorId, page);
  }

  async getByAuthorAndPage(authorId: string, page: number) {
    return await PostsRepository.getByAuthorAndPage(authorId, page);
  }

  async getByPostIdOld(postId: string) {
    Validate.validateObjectId(postId);
    const post = await PostsRepository.getByPostIdOld(postId);
    if (!post) throw PostsExceptions.notFound();
    return post;
  }

  async getByPostId(postId: string) {
    Validate.validateObjectId(postId);
    const post = await PostsRepository.getByPostId(postId);
    if (!post) throw PostsExceptions.notFound();
    return post;
  }

  async getAuthorByPostIdOld(postId: string) {
    Validate.validateObjectId(postId);
    const post = await PostsRepository.getByPostIdOld(postId);
    if (!post) throw PostsExceptions.notFound();
    const user = await UsersRepository.findUserByIdOld(postId);
    if (!user) throw UsersExceptions.NotFound("Author of the post not found");
    return { _id: user._id, username: user.username };
  }

  async getAuthorByPostId(postId: string) {
    const post = await PostsRepository.getByPostId(postId);
    if (!post) throw PostsExceptions.notFound();
    const user = await UsersRepository.findUserById(post.authorId);
    if (!user) throw UsersExceptions.NotFound("Author of the post not found");
    return { _id: user._id, username: user.username };
  }

  async updateByPostIdAndAuthorId(
    postId: string,
    authorId: string,
    newData: object
  ) {
    Validate.validateObjectId(postId);
    Validate.validateObjectId(authorId);
    await PostsRepository.updateByPostIdAndAuthorId(postId, authorId, newData);
  }
}

export const PostsService = new PostsServiceClass();
