import { env } from './env.util';

export const SECRET_CONFIG = {
  MONGODB_LINK: env.string('MONGODB_LINK'),
  COOKIES_SESSION_SECRET: env.string('SESSION_SECRET'),
};
