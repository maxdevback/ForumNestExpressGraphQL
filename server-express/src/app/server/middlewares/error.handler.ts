import { Request, Response } from 'express';
import { sendErrorOrExceptionToClient } from '../../../shared/shared.error-or-exeception-to-client';

export const serverErrorHandler = (err: any, req: Request, res: Response) => {
  sendErrorOrExceptionToClient(res, err);
};
