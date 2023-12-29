import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { sendErrorOrExceptionToClient } from './shared/shared.error-or-exeception-to-client';
import { secretsConfig } from './config/config.sectrets';
import { appInfoConfig } from './config/config.app.info';

export const GlobalMiddlewares = {
  cors: cors({
    origin: appInfoConfig.CLIENT_URL,
    credentials: true,
  }),
  cookieSession: cookieSession({
    name: 'session',
    keys: [secretsConfig.COOKIES_SESSION_SECRET],
  }),
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    sendErrorOrExceptionToClient(res, err);
  },
};
