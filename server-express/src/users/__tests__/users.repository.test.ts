import mongoose from "mongoose";
import { UserModel } from "../users.model";
import { MongoMemoryServer } from "mongodb-memory-server";
import { UsersRepository } from "../users.repository";

describe("UsersRepository", () => {
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
    await UserModel.deleteMany({});
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const mockUser = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      const result = await UsersRepository.register(
        mockUser.username,
        mockUser.email,
        mockUser.password
      );
      expect(result.username).toEqual(mockUser.username);
      expect(result.email).toEqual(mockUser.email);
      // You may add more expectations based on your schema
    });

    it("should throw an error if username or email already exists", async () => {
      expect.assertions(1);
      const mockUser = {
        username: "existinguser",
        email: "existinguser@example.com",
        password: "password123",
      };
      await UsersRepository.register(
        mockUser.username,
        mockUser.email,
        mockUser.password
      );
      try {
        await UsersRepository.register(
          mockUser.username,
          mockUser.email,
          "anotherpassword"
        );
      } catch (err: any) {
        expect(err.httpCode).toBe(409);
      }
    });
  });

  describe("getUserByUsername", () => {
    it("should get user by username", async () => {
      const mockUser = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      await UsersRepository.register(
        mockUser.username,
        mockUser.email,
        mockUser.password
      );
      const result = await UsersRepository.getUserByUsername(mockUser.username);
      expect(result.username).toEqual(mockUser.username);
      expect(result.email).toEqual(mockUser.email);
      // You may add more expectations based on your schema
    });

    it("should throw an error if user with given username not found", async () => {
      expect.assertions(1);
      try {
        await UsersRepository.getUserByUsername("nonexistentuser");
      } catch (err: any) {
        expect(err.httpCode).toBe(404);
      }
    });
  });

  describe("getUserById", () => {
    it("should get user by id", async () => {
      const mockUser = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      const createdUser = await UsersRepository.register(
        mockUser.username,
        mockUser.email,
        mockUser.password
      );
      const result = await UsersRepository.getUserById(createdUser._id);
      expect(result.username).toEqual(mockUser.username);
      expect(result.email).toEqual(mockUser.email);
      // You may add more expectations based on your schema
    });

    it("should throw an error if user with given id not found and id is not valid", async () => {
      expect.assertions(1);
      try {
        await UsersRepository.getUserById("nonexistentuserid");
      } catch (err: any) {
        expect(true).toBe(true);
      }
    });
  });

  describe("deleteAccount", () => {
    it("should delete user account by id", async () => {
      const mockUser = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      const createdUser = await UsersRepository.register(
        mockUser.username,
        mockUser.email,
        mockUser.password
      );
      const result = await UsersRepository.deleteAccount(createdUser._id);
      expect(result).toEqual(expect.objectContaining({ _id: createdUser._id }));
    });
  });
});
