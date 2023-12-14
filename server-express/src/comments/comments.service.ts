import { PostsRepository } from "../posts/posts.repository";
import { UsersRepository } from "../users/users.repository";
import { Validate } from "../shared/validate";
import { CommentsRepository } from "./comments.repository";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersRepository_v1_2 } from "../users/users.repository.v1.2";
import { PostsRepository_v1_2 } from "../posts/posts.repository.v1.2";
import { CommentsRepository_v1_2 } from "./comments.repository.v1.2";

class CommentsServiceClass {
  async create(
    authorId: string,
    postId: string,
    body: string,
    v: "v1.1" | "v1.2" = "v1.1",
    parentCommentId?: string
  ) {
    Validate.validateObjectId(authorId);
    Validate.validateObjectId(postId);
    if (parentCommentId) Validate.validateObjectId(parentCommentId);
    if (v === "v1.1") {
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
      if (parentCommentId) {
        Validate.validateObjectId(parentCommentId);
        const parentComment = await CommentsRepository.getByCommentId(
          parentCommentId
        );
        await NotificationsService.sendNotification(
          "Someone replied to your comment",
          parentComment.authorId
        );
        await CommentsRepository.changeHasReplaysStatus(parentCommentId);
      }
      return comment;
    } else {
      const author = await UsersRepository_v1_2.getUserById(authorId);
      const post = await PostsRepository_v1_2.getByPostId(postId);
      const comment = await CommentsRepository_v1_2.create(
        author.id,
        postId,
        author.username,
        body,
        parentCommentId
      );
      if (!post.hasComments)
        await PostsRepository_v1_2.changeCommentsStatus(true, postId);
      if (parentCommentId) {
        Validate.validateObjectId(parentCommentId);
        const parentComment = await CommentsRepository_v1_2.getByCommentId(
          parentCommentId
        );
        await NotificationsService.sendNotification(
          "Someone replied to your comment",
          parentComment[0].authorId
        );
        CommentsRepository.changeHasReplaysStatus(parentCommentId);
      }
      return comment;
    }
  }
  async getCommentsByPostIdAndPage(
    postId: string,
    page: number,
    parentCommentId: null | string,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    Validate.validateObjectId(postId);
    return v === "v1.1"
      ? await CommentsRepository.getCommentsByPostIdAndPage(
          postId,
          page,
          parentCommentId
        )
      : await CommentsRepository_v1_2.getCommentsByPostIdAndPage(
          postId,
          page,
          parentCommentId
        );
  }
  async getReplaysByCommentIdAndPostIdAndPage(
    commentId: string,
    postId: string,
    page: number,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    Validate.validateObjectId(commentId);
    Validate.validateObjectId(postId);
    return v === "v1.1"
      ? await CommentsRepository.getReplaysByCommentIdAndPostIdAndPage(
          postId,
          commentId,
          page
        )
      : await CommentsRepository_v1_2.getReplaysByCommentIdAndPostIdAndPage(
          postId,
          commentId,
          page
        );
  }
}

export const CommentsService = new CommentsServiceClass();
