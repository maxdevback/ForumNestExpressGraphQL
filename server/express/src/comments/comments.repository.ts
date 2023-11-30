import { CommentsModel } from "./comments.model";

class CommentsRepositoryClass {
  async create(
    authorId: string,
    postId: string,
    username: string,
    body: string,
    parentCommentId?: string
  ) {
    const comment = new CommentsModel({ authorId, postId, username, body });
    if (parentCommentId) {
      const parentComment = await CommentsModel.findById(parentCommentId);
      //TODO: Output the 404 error constant from the post controller to the validation class and import it here
      if (!parentComment) throw { message: "Not found comment" };
      comment.body = `$@{parentComment.username} ${comment.body}`;
    }
    return await comment.save();
  }
  async getCommentsByPostIdAndPage(postId: string, page: number) {
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    return await CommentsModel.find({ parentCommentId: null, postId })
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
    return await CommentsModel.find({ parentCommentId: commentId, postId })
      .skip(skip)
      .limit(pageSize);
  }
}

export const CommentsRepository = new CommentsRepositoryClass();
