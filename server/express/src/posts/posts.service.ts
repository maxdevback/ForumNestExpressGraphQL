import { PostsRepositoryV1_1 } from "./posts.repository";

class PostsServiceV1_1Class {
  async create(title: string, body: string, authorId: string) {
    return await PostsRepositoryV1_1.create(title, body, authorId);
  }
  async getByPage(page: number) {
    return await PostsRepositoryV1_1.getByPage(page);
  }
  async getByAuthorAndPage(authorId: string, page: number) {
    return await PostsRepositoryV1_1.getByAuthorAndPage(authorId, page);
  }
}

export const PostsServiceV1_1 = new PostsServiceV1_1Class();
