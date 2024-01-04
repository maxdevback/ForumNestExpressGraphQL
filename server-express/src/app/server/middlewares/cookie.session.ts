import cookieSession from 'cookie-session';
import { SECRET_CONFIG } from '../../../config/secrets';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export const serverCookieSessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  cookieSession({
    name: 'session',
    keys: [SECRET_CONFIG.COOKIES_SESSION_SECRET],
  })(req, res, next);
};
