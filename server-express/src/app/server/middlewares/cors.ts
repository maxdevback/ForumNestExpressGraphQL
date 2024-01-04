import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { APP_INFO_CONFIG } from '../../../config/app.info';

export const serverCorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  cors({
    origin: APP_INFO_CONFIG.CLIENT_URL,
    credentials: true,
  })(req, res, next);
};
