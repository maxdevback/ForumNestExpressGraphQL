import { CommentModel } from "./comments.model";

class CommentsRepositoryClass {
  notFoundComment = {
    httpCode: 404,
    message: "Not found comment",
  };

  async create(
    authorId: string,
    postId: string,
    username: string,
    body: string,
    parentCommentId: string | null = null
  ) {
    await CommentModel.aggregate([
      {
        $addFields: {
          authorId: authorId,
          postId: postId,
          username: username,
          body: body,
          parentCommentId: parentCommentId,
        },
      },
      {
        $merge: {
          into: "comments",
          whenNotMatched: "insert",
        },
      },
    ]);
  }

  async getCommentsByPostIdAndPage(postId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await CommentModel.aggregate([
      { $match: { parentCommentId: null, postId: postId } },
      { $skip: skip },
      { $limit: pageSize },
    ]);
  }

  async getReplaysByCommentIdAndPostIdAndPage(
    postId: string,
    commentId: string,
    page: number
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await CommentModel.aggregate([
      { $match: { parentCommentId: commentId, postId: postId } },
      { $skip: skip },
      { $limit: pageSize },
    ]);
  }

  async getByCommentId(commentId: string) {
    return await CommentModel.aggregate([{ $match: { _id: commentId } }]);
  }

  async increaseRoughNumberOfLikes(commentId: string) {
    return await CommentModel.aggregate([
      { $match: { _id: commentId } },
      { $set: { roughNumberOfLikes: { $add: ["$roughNumberOfLikes", 1] } } },
    ]);
  }
}

export const CommentsRepository_v1_2 = new CommentsRepositoryClass();
