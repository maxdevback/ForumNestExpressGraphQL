import { LikesRepository } from "../likes.repository";
import { LikesModel } from "../likes.model";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe("LikesRepository", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    jest.restoreAllMocks();
    await LikesModel.deleteMany({});
  });

  describe("create", () => {
    it("should create a new like", async () => {
      const entityId = "123";
      const authorId = "456";
      const result = await LikesRepository.create(entityId, authorId);

      expect(result.likedEntityId).toEqual(entityId);
      expect(result.authorId).toEqual(authorId);
    });
  });

  describe("checkIsAlreadyLiked", () => {
    it("should return true if the entity is already liked", async () => {
      const entityId = "123";
      const authorId = "456";
      await LikesModel.create({ likedEntityId: entityId, authorId });

      const result = await LikesRepository.checkIsAlreadyLiked(
        authorId,
        entityId
      );
      expect(result).toEqual(true);
    });

    it("should return false if the entity is not liked", async () => {
      const entityId = "123";
      const authorId = "456";

      const result = await LikesRepository.checkIsAlreadyLiked(
        authorId,
        entityId
      );
      expect(result).toEqual(false);
    });
  });
});
