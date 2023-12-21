import { Types } from "mongoose";
import { ICommentCreate } from "./comments.interfaces";
import { CommentModel } from "./comments.model";

class CommentsRepositoryClass {
  async create(data: ICommentCreate) {
    const res = await CommentModel.aggregate([
      {
        $addFields: {
          authorId: data.authorId,
          postId: data.postId,
          username: data.username,
          body: data.body,
          parentCommentId: data.parentCommentId,
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
    const res = await CommentModel.aggregate([
      { $match: { _id: new Types.ObjectId(commentId) } },
    ]);
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
