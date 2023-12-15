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
    const res = await CommentModel.aggregate([
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
    return res;
  }

  async getCommentsByPostIdAndPage(
    postId: string,
    page: number,
    parentCommentId: string | null = null
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;

    return await CommentModel.aggregate([
      { $match: { parentCommentId, postId: postId } },
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
    const res = await CommentModel.aggregate([{ $match: { _id: commentId } }]);
    return res[0];
  }

  async increaseRoughNumberOfLikes(commentId: string) {
    const res = await CommentModel.aggregate([
      { $match: { _id: commentId } },
      { $set: { roughNumberOfLikes: { $add: ["$roughNumberOfLikes", 1] } } },
    ]);
    return res[0];
  }
}

export const CommentsRepository_v1_2 = new CommentsRepositoryClass();
