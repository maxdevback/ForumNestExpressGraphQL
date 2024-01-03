import { NextFunction, Request, Response } from 'express';

export async function asyncWrap(
  controller: (req: Request, res: Response) => any,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
}
