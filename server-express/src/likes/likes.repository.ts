import { LikesModel } from './likes.model';

class LikesRepositoryClass {
  async create(entityId: string, authorId: string) {
    const newLike = new LikesModel({ likedEntityId: entityId, authorId });
    return await newLike.save();
  }
  async checkIsAlreadyLiked(authorId: string, entityId: string) {
    const like = await LikesModel.findOne({
      authorId,
      likedEntityId: entityId,
    });
    return !!like;
  }
}

export const LikesRepository = new LikesRepositoryClass();
