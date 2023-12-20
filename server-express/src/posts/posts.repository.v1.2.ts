import { UsersExceptions } from "../users/users.exceptions";
import { PostsExceptions } from "./posts.exceptions";
import { PostModel } from "./posts.model";

class PostsRepositoryClass {
  async create(title: string, body: string, authorId: string) {
    PostModel.aggregate([
      {
        $addFields: {
          title: title,
          body: body,
          authorId: authorId,
        },
      },
      {
        $merge: {
          into: "posts",
          whenNotMatched: "insert",
        },
      },
    ]);
  }

  async changeCommentsStatus(newStatus: boolean, postId: string) {
    const updatedPost = await PostModel.aggregate([
      { $match: { _id: postId } },
      { $set: { hasComments: newStatus } },
    ]);

    if (!updatedPost || updatedPost.length === 0)
      throw UsersExceptions.NotFound;
    return updatedPost[0];
  }

  async getByPage(page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await PostModel.aggregate([{ $skip: skip }, { $limit: pageSize }]);
  }

  async getByAuthorAndPage(authorId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await PostModel.aggregate([
      { $match: { authorId: authorId } },
      { $skip: skip },
      { $limit: pageSize },
    ]);
  }

  async getByPostId(postId: string) {
    const post = await PostModel.aggregate([{ $match: { _id: postId } }]);

    if (!post || post.length === 0) throw PostsExceptions.notFound();
    return post[0];
  }

  async updateByPostIdAndAuthorId(
    postId: string,
    authorId: string,
    newData: object
  ) {
    const updatedPost = await PostModel.aggregate([
      { $match: { _id: postId, authorId: authorId } },
      { $set: newData },
    ]);

    if (!updatedPost || updatedPost.length === 0)
      throw PostsExceptions.notFound();
    return updatedPost[0];
  }

  async increaseRoughNumberOfLikes(postId: string) {
    const updatedPost = await PostModel.aggregate([
      { $match: { _id: postId } },
      { $set: { roughNumberOfLikes: { $add: ["$roughNumberOfLikes", 1] } } },
    ]);

    if (!updatedPost || updatedPost.length === 0)
      throw PostsExceptions.notFound();
    return updatedPost[0];
  }
}

export const PostsRepository_v1_2 = new PostsRepositoryClass();
