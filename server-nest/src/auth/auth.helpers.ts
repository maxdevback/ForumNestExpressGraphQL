import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AUTH_CONSTANTS } from './auth.constants';

@Injectable()
export class AuthHelpers {
  async comparePasswords(purePassword: string, hashedPassword: string) {
    return await compare(purePassword, hashedPassword);
  }
  async hashPassword(password: string) {
    return await hash(password, AUTH_CONSTANTS.PASSWORD_SALT);
  }
}
