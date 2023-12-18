/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRepository } from '../users.repository';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let userRepository: Repository<User>;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    password: 'testpassword',
    email: 'test@example.com',
    posts: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockImplementation(({ where }) => {
              if (where.id && where.id === mockUser.id) {
                return mockUser;
              } else if (
                (where[0] && where[0].username === mockUser.username) ||
                (where[1] && where[1].email === mockUser.email)
              ) {
                return mockUser;
              }
              return null;
            }),
            create: jest.fn().mockImplementation((userInfo) => ({
              ...mockUser,
              ...userInfo,
            })),
            save: jest.fn().mockImplementation((user) => user),
            delete: jest.fn(),
            findById: jest.fn().mockImplementation((id) => {
              if (id === mockUser.id) {
                return mockUser;
              }
              throw new HttpException('empty id', 404);
            }),
          },
        },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findByUsernameOrEmail', () => {
    it('should find user by username', async () => {
      const user = await usersRepository.findByUsernameOrEmail(
        mockUser.username,
        '',
      );
      expect(user).toEqual(mockUser);
    });

    it('should find user by email', async () => {
      const user = await usersRepository.findByUsernameOrEmail(
        '',
        mockUser.email,
      );
      expect(user).toEqual(mockUser);
    });

    it('should throw HttpException if user is not found and throwError is true', async () => {
      await expect(
        usersRepository.findByUsernameOrEmail('nonexistentuser', '', true),
      ).rejects.toThrowError(HttpException);
    });

    it('should return null if user is not found and throwError is false', async () => {
      const user = await usersRepository.findByUsernameOrEmail(
        'nonexistentuser',
        '',
        false,
      );
      expect(user).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userInfo = {
        username: 'newuser',
        password: 'newpassword',
        email: 'newuser@example.com',
      };
      const newUser = await usersRepository.create(userInfo);
      expect(newUser.username).toEqual(userInfo.username);
      expect(newUser.password).toEqual(userInfo.password);
      expect(newUser.email).toEqual(userInfo.email);
    });
  });

  describe('deleteById', () => {
    it('should delete user by id', async () => {
      const deleteResult = await usersRepository.deleteById(mockUser.id);
      expect(deleteResult).toEqual(new HttpException('Deleted', HttpStatus.OK));
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const user = await usersRepository.findById(mockUser.id);
      expect(user).toEqual(mockUser);
    });

    it('should throw HttpException if user is not found', async () => {
      await expect(usersRepository.findById(999)).rejects.toThrowError(
        HttpException,
      );
    });
  });
});
