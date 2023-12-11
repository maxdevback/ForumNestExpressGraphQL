import { PostsRepository } from "./posts.repository";
import { UsersRepository } from "../users/users.repository";
import { Validate } from "../shared/validate";
import { PostsRepository_v1_2 } from "./posts.repository.v1.2";
import { UsersRepository_v1_2 } from "../users/users.repository.v1.2";

class PostsServiceClass {
  async create(
    title: string,
    body: string,
    authorId: string,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    return v === "v1.1"
      ? await PostsRepository.create(title, body, authorId)
      : await PostsRepository_v1_2.create(title, body, authorId);
  }
  async getByPage(page: number, v: "v1.1" | "v1.2" = "v1.1") {
    return v === "v1.1"
      ? await PostsRepository.getByPage(page)
      : await PostsRepository_v1_2.getByPage(page);
  }
  async getByAuthorAndPage(
    authorId: string,
    page: number,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    Validate.validateObjectId(authorId);
    return v === "v1.1"
      ? await PostsRepository.getByAuthorAndPage(authorId, page)
      : await PostsRepository_v1_2.getByAuthorAndPage(authorId, page);
  }
  async getByPostId(postId: string, v: "v1.1" | "v1.2" = "v1.1") {
    Validate.validateObjectId(postId);
    return v === "v1.1"
      ? await PostsRepository.getByPostId(postId)
      : await PostsRepository_v1_2.getByPostId(postId);
  }
  async getAuthorByPostId(postId: string, v: "v1.1" | "v1.2" = "v1.1") {
    Validate.validateObjectId(postId);
    if (v === "v1.1") {
      const post = await PostsRepository.getByPostId(postId);
      const user = await UsersRepository.getUserById(post.authorId);
      return { _id: user._id, username: user.username };
    } else {
      const post = await PostsRepository_v1_2.getByPostId(postId);
      const user = await UsersRepository_v1_2.getUserById(post.authorId);
      return { _id: user._id, username: user.username };
    }
  }
  async updateByPostIdAndAuthorId(
    postId: string,
    authorId: string,
    newData: object,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    Validate.validateObjectId(postId);
    Validate.validateObjectId(authorId);
    return v === "v1.1"
      ? await PostsRepository.updateByPostIdAndAuthorId(
          postId,
          authorId,
          newData
        )
      : await PostsRepository_v1_2.updateByPostIdAndAuthorId(
          postId,
          authorId,
          newData
        );
  }
}

export const PostsService = new PostsServiceClass();
