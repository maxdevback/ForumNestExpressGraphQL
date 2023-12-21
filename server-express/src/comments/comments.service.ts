import { PostsRepository } from "../posts/posts.repository";
import { UsersRepository } from "../users/users.repository";
import { Validate } from "../shared/validate";
import { CommentsRepository } from "./comments.repository";
import { NotificationsService } from "../notifications/notifications.service";
import { PostsRepository_v1_2 } from "../posts/posts.repository.v1.2";
import { CommentsRepository_v1_2 } from "./comments.repository.v1.2";
import { ICommentCreate } from "./comments.interfaces";
import { UsersExceptions } from "../users/users.exceptions";

class CommentsServiceClass {
  async create(data: ICommentCreate, v: "v1.1" | "v1.2" = "v1.1") {
    Validate.validateObjectId(data.authorId);
    Validate.validateObjectId(data.postId);
    if (data.parentCommentId) Validate.validateObjectId(data.parentCommentId);
    if (v === "v1.2") {
      const author = await UsersRepository.findUserById(data.authorId);
      if (!author)
        throw UsersExceptions.NotFound("Author of the post not found");
      const post = await PostsRepository.getByPostId(data.postId);
      const comment = await CommentsRepository.create({
        authorId: author.id,
        postId: data.postId,
        username: author.username,
        body: data.body,
        parentCommentId: data.parentCommentId,
      });
      if (!post.hasComments)
        await PostsRepository.changeCommentsStatus(true, data.postId);
      if (data.parentCommentId) {
        Validate.validateObjectId(data.parentCommentId);
        const parentComment = await CommentsRepository.getByCommentId(
          data.parentCommentId
        );
        await NotificationsService.sendNotification(
          "Someone replied to your comment",
          parentComment.authorId
        );
        await CommentsRepository.changeHasReplaysStatus(data.parentCommentId);
      }
      return comment;
    } else {
      const author = await UsersRepository.findUserById(data.authorId);
      if (!author)
        throw UsersExceptions.NotFound("Author of the post not found");
      const post = await PostsRepository_v1_2.getByPostId(data.postId);
      const comment = await CommentsRepository_v1_2.create({
        authorId: author.id,
        postId: data.postId,
        username: author.username,
        body: data.body,
        parentCommentId: data.parentCommentId,
      });
      if (!post.hasComments)
        await PostsRepository_v1_2.changeCommentsStatus(true, data.postId);
      if (data.parentCommentId) {
        Validate.validateObjectId(data.parentCommentId);
        const parentComment = await CommentsRepository_v1_2.getByCommentId(
          data.parentCommentId
        );
        await NotificationsService.sendNotification(
          "Someone replied to your comment",
          parentComment[0].authorId
        );
        CommentsRepository.changeHasReplaysStatus(data.parentCommentId);
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
