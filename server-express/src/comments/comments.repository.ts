import { CommentModel } from "./comments.model";
import { CommentsExceptions } from "./comments.exceptions";
import { ICommentCreate } from "./comments.interfaces";

class CommentsRepositoryClass {
  async create(data: ICommentCreate) {
    const comment = new CommentModel({
      authorId: data.authorId,
      postId: data.postId,
      username: data.username,
      body: data.body,
    });
    if (data.parentCommentId) {
      const parentComment = await CommentModel.findById(data.parentCommentId);
      if (!parentComment)
        throw CommentsExceptions.notFound("Not Found comment");
      comment.parentCommentId = data.parentCommentId;
      comment.body = `${parentComment.username} ${comment.body}`;
    }
    return await comment.save();
  }
  async getCommentsByPostIdAndPage(
    postId: string,
    page: number,
    parentCommentId: null | string = null
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await CommentModel.find({ parentCommentId, postId })
      .skip(skip)
      .limit(pageSize);
  }
  async getReplaysByCommentIdAndPostIdAndPage(
    postId: string,
    commentId: string,
    page: number
  ) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await CommentModel.find({ parentCommentId: commentId, postId })
      .skip(skip)
      .limit(pageSize);
  }
  async getByCommentId(commentId: string) {
    const comment = await CommentModel.findById(commentId);
    if (!comment) throw CommentsExceptions.notFound("Not Found comment");
    return comment;
  }
  async increaseRoughNumberOfLikes(commentId: string) {
    const comment = await this.getByCommentId(commentId);
    comment.roughNumberOfLikes++;
    return await comment.save();
  }
  async changeHasReplaysStatus(commentId: string) {
    const comment = await this.getByCommentId(commentId);
    if (comment.hasReplays) return await comment.save();
    comment.hasReplays = true;
    return await comment.save();
  }
}

export const CommentsRepository = new CommentsRepositoryClass();
