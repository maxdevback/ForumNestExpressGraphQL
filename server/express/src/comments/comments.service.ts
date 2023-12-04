import { PostsRepository } from "../posts/posts.repository";
import { UsersRepository } from "../users/users.repository";
import { Validate } from "../server/validate";
import { CommentsRepository } from "./comments.repository";
import { NotificationsService } from "../notifications/notifications.service";

class CommentsServiceClass {
  async create(
    authorId: string,
    postId: string,
    body: string,
    parentCommentId?: string
  ) {
    Validate.validateObjectId(authorId);
    Validate.validateObjectId(postId);
    const author = await UsersRepository.getUserById(authorId);
    const post = await PostsRepository.getByPostId(postId);
    console.log(parentCommentId);
    const comment = await CommentsRepository.create(
      author.id,
      postId,
      author.username,
      body,
      parentCommentId
    );
    if (!post.hasComments)
      await PostsRepository.changeCommentsStatus(true, postId);
    if (parentCommentId) {
      Validate.validateObjectId(parentCommentId);
      const parentComment = await CommentsRepository.getByCommentId(
        parentCommentId
      );
      console.log(
        "Notifications",
        await NotificationsService.sendNotification(
          "Someone replied to your comment",
          parentComment.authorId
        )
      );
    }
    return comment;
  }
  async getCommentsByPostIdAndPage(postId: string, page: number) {
    Validate.validateObjectId(postId);
    return await CommentsRepository.getCommentsByPostIdAndPage(postId, page);
  }
  async getReplaysByCommentIdAndPostIdAndPage(
    commentId: string,
    postId: string,
    page: number
  ) {
    Validate.validateObjectId(commentId);
    Validate.validateObjectId(postId);
    return await CommentsRepository.getReplaysByCommentIdAndPostIdAndPage(
      postId,
      commentId,
      page
    );
  }
}

export const CommentsService = new CommentsServiceClass();
