import { PostsRepository } from "../posts.repository";
import { PostModel } from "../posts.model";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

describe("PostsRepository", () => {
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
    await PostModel.deleteMany({});
  });

  describe("create", () => {
    it("should create a new post", async () => {
      const title = "Test Post";
      const body = "This is a test post.";
      const authorId = "123";
      const result = await PostsRepository.create(title, body, authorId);

      expect(result.title).toEqual(title);
      expect(result.body).toEqual(body);
      expect(result.authorId).toEqual(authorId);
    });
  });

  describe("changeCommentsStatus", () => {
    it("should change comments status for a post", async () => {
      const postId = "658042fb6f8792629894d8fd";
      const newStatus = true;
      await PostModel.create({
        _id: postId,
        title: "Test Post",
        body: "Test Body",
        authorId: "456",
      });

      const result = await PostsRepository.changeCommentsStatus(
        newStatus,
        postId
      );
      expect(result.hasComments).toEqual(newStatus);
    });

    it("should throw an error if the post doesn't exist and check objectId", async () => {
      expect.assertions(1);
      const postId = "nonexistent-post-id";
      const newStatus = true;

      try {
        await PostsRepository.changeCommentsStatus(newStatus, postId);
      } catch (err: any) {
        expect(true).toEqual(true);
      }
    });
  });

  describe("getByPage", () => {
    it("should return posts by page", async () => {
      for (let i = 1; i <= 30; i++) {
        await PostModel.create({
          title: `Post ${i}`,
          body: `Body ${i}`,
          authorId: "123",
        });
      }

      const page = 1;
      const result = await PostsRepository.getByPage(page);

      expect(result).toHaveLength(25);
      expect(result[0].title).toEqual("Post 1");
      expect(result[0].body).toEqual("Body 1");
      expect(result[0].authorId).toEqual("123");
    });

    it("should return an empty array if no posts are found", async () => {
      const page = 1;
      const result = await PostsRepository.getByPage(page);

      expect(result).toHaveLength(0);
    });
  });
});
