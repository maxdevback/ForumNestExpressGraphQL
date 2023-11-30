import { PostsRepository } from "../posts/posts.repository";
import { UsersRepository } from "../users/users.repository";
import { Validate } from "../utils/validate";
import { CommentsRepository } from "./comments.repository";

class CommentsServiceClass {
  async create(
    authorId: string,
    postId: string,
    body: string,
    parentCommentId?: string
  ) {
    Validate.checkId(authorId);
    Validate.checkId(postId);
    const author = await UsersRepository.getUserById(authorId);
    const post = await PostsRepository.getByPostId(postId);
    const comment = await CommentsRepository.create(
      author.id,
      postId,
      author.username,
      body,
      parentCommentId
    );
    if (!post.hasComments)
      await PostsRepository.changeCommentsStatus(true, postId);
    return comment;
  }
  async getCommentsByPostIdAndPage(postId: string, page: number) {
    Validate.checkId(postId);
    return await CommentsRepository.getCommentsByPostIdAndPage(postId, page);
  }
  async getReplaysByCommentIdAndPostIdAndPage(
    commentId: string,
    postId: string,
    page: number
  ) {
    Validate.checkId(commentId);
    Validate.checkId(postId);
    return await CommentsRepository.getReplaysByCommentIdAndPostIdAndPage(
      postId,
      commentId,
      page
    );
  }
}

export const CommentsService = new CommentsServiceClass();
