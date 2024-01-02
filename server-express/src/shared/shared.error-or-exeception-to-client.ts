import { Response } from 'express';
import { ExceptionClass } from '../model/exceptions/exception';

export const sendErrorOrExceptionToClient = (res: Response, err: any) => {
  if (!(err instanceof ExceptionClass) || err.httpCode === 500)
    return res.status(500).json('Internal server error');
  return res.status(err.httpCode).json(err.message);
};
