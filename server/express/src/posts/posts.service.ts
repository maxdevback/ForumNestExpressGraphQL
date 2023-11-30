import { PostsRepository } from "./posts.repository";

class PostsServiceClass {
  async create(title: string, body: string, authorId: string) {
    return await PostsRepository.create(title, body, authorId);
  }
  async getByPage(page: number, apiVersion: "v1.1" | "v1.2" = "v1.1") {
    return await PostsRepository.getByPage(page);
  }
  async getByAuthorAndPage(authorId: string, page: number) {
    return await PostsRepository.getByAuthorAndPage(authorId, page);
  }
}

export const PostsService = new PostsServiceClass();
