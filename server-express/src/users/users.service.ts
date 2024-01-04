import { ForbiddenException } from '../model/exceptions/forbidden.exception';
import { ISession } from './users.interfaces';
import { UsersRepository } from './users.repository';

class UsersServiceClass {
  async deleteAccount(id: string | undefined, session: ISession) {
    if (!id) {
      throw new ForbiddenException();
    }
    session.user = null;
    return await UsersRepository.deleteAccount(id);
  }
}

export const UsersService = new UsersServiceClass();
