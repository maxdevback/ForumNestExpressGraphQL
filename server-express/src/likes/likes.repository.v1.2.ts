import { LikesModel } from "./likes.model";

class LikesRepositoryClass {
  async create(entityId: string, authorId: string) {
    const aggregationPipeline = [
      {
        $merge: {
          into: "likes",
        },
      },
    ];

    await LikesModel.aggregate(aggregationPipeline);

    return await LikesModel.aggregate([
      { $addFields: { likedEntityId: entityId, authorId: authorId } },
      {
        $merge: {
          into: "likes",
          whenNotMatched: "insert",
        },
      },
    ]);
  }

  async checkIsAlreadyLiked(authorId: string, entityId: string) {
    const aggregationPipeline = [
      {
        $match: {
          authorId,
          likedEntityId: entityId,
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ];

    const result = await LikesModel.aggregate(aggregationPipeline);
    return result.length > 0;
  }
}

export const LikesRepository_v1_2 = new LikesRepositoryClass();
