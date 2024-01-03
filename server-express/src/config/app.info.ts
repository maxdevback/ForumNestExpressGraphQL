import { env } from './env.util';

export const APP_INFO_CONFIG = {
  PORT: env.number('PORT'),
  CLIENT_URL: env.string('CLIENT_URL'),
  NODE_ENV: env.string('NODE_ENV')!,
};
