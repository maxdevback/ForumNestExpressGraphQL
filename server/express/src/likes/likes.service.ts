import { Validate } from "../server/validate";
import { PostsRepository } from "../posts/posts.repository";
import { CommentsRepository } from "../comments/comments.repository";
import { LikesRepository } from "./likes.repository";
import { NotificationsService } from "../notifications/notifications.service";
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
    authorId: string
  ) {
    Validate.validateObjectId(entityId);
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
  }
  async isLikedEntity(entityId: string, authorId: string) {
    Validate.validateObjectId(entityId);
    return await LikesRepository.checkIsAlreadyLiked(authorId, entityId);
  }
}

export const LikesService = new LikesServiceClass();
