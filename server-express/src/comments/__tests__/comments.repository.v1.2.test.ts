import { CommentsRepository_v1_2 } from "../comments.repository.v1.2";
import { CommentModel } from "../comments.model";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { CommentsRepository } from "../comments.repository";

describe("CommentsRepository", () => {
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
    await CommentModel.deleteMany({});
  });

  describe("create", () => {
    it("should create a new comment with no parent comment", async () => {
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
      };
      const result = await CommentsRepository_v1_2.create(
        mockComment.authorId,
        mockComment.postId,
        mockComment.username,
        mockComment.body
      );
      console.log("39 string", result);
      expect(result[0].authorId).toEqual(mockComment.authorId);
      expect(result[0].postId).toEqual(mockComment.postId);
      expect(result[0].username).toEqual(mockComment.username);
      expect(result[0].body).toEqual(mockComment.body);
    });

    it("should create a new comment with a parent comment", async () => {
      const parentComment = new CommentModel({
        authorId: "123",
        postId: "456",
        username: "parentuser",
        body: "parent comment",
      });
      await parentComment.save();
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
      };
      const result = await CommentsRepository_v1_2.create(
        mockComment.authorId,
        mockComment.postId,
        mockComment.username,
        mockComment.body,
        parentComment._id
      );
      expect(result[0].authorId).toEqual(mockComment.authorId);
      expect(result[0].postId).toEqual(mockComment.postId);
      expect(result[0].username).toEqual(mockComment.username);
      expect(result[0].body).toEqual(
        `${parentComment.username} ${mockComment.body}`
      );
      expect(result[0].parentCommentId?.toString()).toEqual(
        parentComment._id.toString()
      );
    });

    it("should throw an error if parent comment is not found", async () => {
      expect.assertions(1);
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
      };
      try {
        await CommentsRepository_v1_2.create(
          mockComment.authorId,
          mockComment.postId,
          mockComment.username,
          mockComment.body,
          "nonexistent-comment-id"
        );
      } catch (err) {
        expect(true).toBe(true);
      }
    });
  });

  describe("getCommentsByPostIdAndPage", () => {
    it("should return comments by post id and page", async () => {
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
      };
      await CommentModel.create(mockComment);
      const result = await CommentsRepository_v1_2.getCommentsByPostIdAndPage(
        mockComment.postId,
        1
      );
      expect(result).toHaveLength(1);
      expect(result[0].authorId).toEqual(mockComment.authorId);
      expect(result[0].postId).toEqual(mockComment.postId);
      expect(result[0].username).toEqual(mockComment.username);
      expect(result[0].body).toEqual(mockComment.body);
    });

    it("should return comments by post id, page, and parent comment id", async () => {
      const parentComment = new CommentModel({
        authorId: "123",
        postId: "456",
        username: "parentuser",
        body: "parent comment",
      });
      await parentComment.save();
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
        parentCommentId: parentComment._id,
      };
      await CommentModel.create(mockComment);
      const result = await CommentsRepository_v1_2.getCommentsByPostIdAndPage(
        mockComment.postId,
        1,
        parentComment._id
      );
      expect(result).toHaveLength(1);
      expect(result[0].authorId).toEqual(mockComment.authorId);
      expect(result[0].postId).toEqual(mockComment.postId);
      expect(result[0].username).toEqual(mockComment.username);
      expect(result[0].body).toEqual(mockComment.body);
      expect(result[0].parentCommentId?.toString()).toEqual(
        parentComment._id.toString()
      );
    });
  });

  describe("getReplaysByCommentIdAndPostIdAndPage", () => {
    it("should return replies by comment id, post id, and page", async () => {
      const parentComment = new CommentModel({
        authorId: "123",
        postId: "456",
        username: "parentuser",
        body: "parent comment",
      });
      await parentComment.save();
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
        parentCommentId: parentComment._id,
      };
      await CommentModel.create(mockComment);
      const result =
        await CommentsRepository_v1_2.getReplaysByCommentIdAndPostIdAndPage(
          mockComment.postId,
          parentComment._id,
          1
        );
      expect(result).toHaveLength(1);
      expect(result[0].authorId).toEqual(mockComment.authorId);
      expect(result[0].postId).toEqual(mockComment.postId);
      expect(result[0].username).toEqual(mockComment.username);
      expect(result[0].body).toEqual(mockComment.body);
      expect(result[0].parentCommentId?.toString()).toEqual(
        parentComment._id.toString()
      );
    });
  });

  describe("getByCommentId", () => {
    it("should return comment by comment id", async () => {
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
      };
      const comment = await CommentModel.create(mockComment);
      const result = await CommentsRepository_v1_2.getByCommentId(comment._id);
      expect(result.authorId).toEqual(mockComment.authorId);
      expect(result.postId).toEqual(mockComment.postId);
      expect(result.username).toEqual(mockComment.username);
      expect(result.body).toEqual(mockComment.body);
    });

    it("should throw an error if comment is not found", async () => {
      expect.assertions(1);
      try {
        await CommentsRepository_v1_2.getByCommentId("nonexistent-comment-id");
      } catch (err) {
        expect(true).toBe(true);
      }
    });
  });

  describe("increaseRoughNumberOfLikes", () => {
    it("should increase rough number of likes for comment", async () => {
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
        roughNumberOfLikes: 0,
      };
      const comment = await CommentModel.create(mockComment);
      const result = await CommentsRepository_v1_2.increaseRoughNumberOfLikes(
        comment._id
      );
      expect(result.roughNumberOfLikes).toEqual(
        mockComment.roughNumberOfLikes + 1
      );
    });
  });

  describe("changeHasReplaysStatus", () => {
    it("should change hasReplays status for comment if it is false", async () => {
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
        hasReplays: false,
      };
      const comment = await CommentModel.create(mockComment);
      const result = await CommentsRepository.changeHasReplaysStatus(
        comment._id
      );
      expect(result.hasReplays).toEqual(true);
    });

    it("should not change hasReplays status for comment if it is true", async () => {
      const mockComment = {
        authorId: "123",
        postId: "456",
        username: "testuser",
        body: "test comment",
        hasReplays: true,
      };
      const comment = await CommentModel.create(mockComment);
      const result = await CommentsRepository.changeHasReplaysStatus(
        comment._id
      );
      expect(result.hasReplays).toEqual(true);
    });
  });
});
