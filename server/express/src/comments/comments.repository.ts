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
    parentCommentId?: string
  ) {
    const comment = new CommentModel({ authorId, postId, username, body });
    if (parentCommentId) {
      const parentComment = await CommentModel.findById(parentCommentId);
      if (!parentComment) throw this.notFoundComment;
      comment.body = `$@{parentComment.username} ${comment.body}`;
    }
    return await comment.save();
  }
  async getCommentsByPostIdAndPage(postId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await CommentModel.find({ parentCommentId: null, postId })
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
    if (!comment) throw this.notFoundComment;
    return comment;
  }
  async increaseRoughNumberOfLikes(commentId: string) {
    const comment = await this.getByCommentId(commentId);
    comment.roughNumberOfLikes++;
    return await comment.save();
  }
}

export const CommentsRepository = new CommentsRepositoryClass();
