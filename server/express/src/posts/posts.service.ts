import { isValidObjectId } from "mongoose";
import { PostsRepository } from "./posts.repository";
import { UsersRepository } from "../users/users.repository";

class PostsServiceClass {
  checkId(id: string) {
    if (!isValidObjectId(id))
      throw { httpCode: 400, message: "The id is not valid" };
  }
  async create(title: string, body: string, authorId: string) {
    return await PostsRepository.create(title, body, authorId);
  }
  //TODO: api version
  async getByPage(page: number, apiVersion: "v1.1" | "v1.2" = "v1.1") {
    return await PostsRepository.getByPage(page);
  }
  async getByAuthorAndPage(authorId: string, page: number) {
    this.checkId(authorId);
    return await PostsRepository.getByAuthorAndPage(authorId, page);
  }
  async getByPostId(postId: string) {
    this.checkId(postId);
    return await PostsRepository.getByPostId(postId);
  }
  async getAuthorByPostId(postId: string) {
    this.checkId(postId);
    const post = await PostsRepository.getByPostId(postId);
    const user = await UsersRepository.getUserById(post.authorId);
    return { _id: user._id, username: user.username };
  }
  async updateByPostIdAndAuthorId(
    postId: string,
    authorId: string,
    newData: object
  ) {
    this.checkId(postId);
    this.checkId(authorId);
    return await PostsRepository.updateByPostIdAndAuthorId(
      postId,
      authorId,
      newData
    );
  }
}

export const PostsService = new PostsServiceClass();
