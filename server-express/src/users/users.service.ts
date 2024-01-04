import { ISession } from './users.interfaces';
import { UsersRepository } from './users.repository';

class UsersServiceClass {
  async deleteAccount(id: string, session: ISession) {
    session.user = null;
    return await UsersRepository.deleteAccount(id);
  }
}

export const UsersService = new UsersServiceClass();
