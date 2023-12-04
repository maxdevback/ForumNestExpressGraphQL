import { Validate } from "../server/validate";
import { PostsRepository } from "../posts/posts.repository";
import { CommentsRepository } from "../comments/comments.repository";
import { LikesRepository } from "./likes.repository";
import { NotificationsService } from "../notifications/notifications.service";
import { PostsRepository_v1_2 } from "../posts/posts.repository.v1.2";
import { CommentsRepository_v1_2 } from "../comments/comments.repository.v1.2";
import { LikesRepository_v1_2 } from "./likes.repository.v1.2";
class LikesServiceClass {
  selfLike = {
    httpCode: 400,
    message: "You can't like yourself",
  };
  alreadyLiked = {
    httpCode: 409,
    message: "You've already liked it",
  };
  async likeEntity(
    entityId: string,
    type: "post" | "comment",
    authorId: string,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    Validate.validateObjectId(entityId);
    if (v === "v1.1") {
      let entity;
      if (type === "post") {
        entity = await PostsRepository.getByPostId(entityId);
      } else {
        entity = await CommentsRepository.getByCommentId(entityId);
      }
      if (entity.authorId === authorId) throw this.selfLike;
      if (await LikesRepository.checkIsAlreadyLiked(authorId, entityId))
        throw this.alreadyLiked;
      const newLike = await LikesRepository.create(entityId, authorId);
      if (type === "post") {
        await PostsRepository.increaseRoughNumberOfLikes(entityId);
        await NotificationsService.sendNotification(
          "Someone liked your post",
          entity.authorId
        );
      } else {
        await CommentsRepository.increaseRoughNumberOfLikes(entityId);
        await NotificationsService.sendNotification(
          "Someone liked your comment",
          entity.authorId
        );
      }
      return newLike;
    } else {
      let entity;
      if (type === "post") {
        entity = await PostsRepository_v1_2.getByPostId(entityId);
      } else {
        entity = await CommentsRepository_v1_2.getByCommentId(entityId);
      }
      if (entity.authorId === authorId) throw this.selfLike;
      if (await LikesRepository_v1_2.checkIsAlreadyLiked(authorId, entityId))
        throw this.alreadyLiked;
      const newLike = await LikesRepository_v1_2.create(entityId, authorId);
      if (type === "post") {
        await PostsRepository_v1_2.increaseRoughNumberOfLikes(entityId);
        await NotificationsService.sendNotification(
          "Someone liked your post",
          entity.authorId,
          "v1.2"
        );
      } else {
        await CommentsRepository.increaseRoughNumberOfLikes(entityId);
        await NotificationsService.sendNotification(
          "Someone liked your comment",
          entity.authorId,
          "v1.2"
        );
      }
      return newLike;
    }
  }
  async isLikedEntity(
    entityId: string,
    authorId: string,
    v: "v1.1" | "v1.2" = "v1.1"
  ) {
    Validate.validateObjectId(entityId);
    return v === "v1.1"
      ? await LikesRepository.checkIsAlreadyLiked(authorId, entityId)
      : await LikesRepository_v1_2.checkIsAlreadyLiked(authorId, entityId);
  }
}

export const LikesService = new LikesServiceClass();
