import { UsersRepository } from './users.repository';

class UsersServiceClass {
  async deleteAccount(id: string) {
    return await UsersRepository.deleteAccount(id);
  }
}

export const UsersService = new UsersServiceClass();
