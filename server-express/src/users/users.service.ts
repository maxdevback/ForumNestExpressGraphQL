import { UsersRepository } from './users.repository';

class UsersServiceClass {
  async deleteAccount(id: string, session: { user: any }) {
    session.user = null;
    return await UsersRepository.deleteAccount(id);
  }
}

export const UsersService = new UsersServiceClass();
