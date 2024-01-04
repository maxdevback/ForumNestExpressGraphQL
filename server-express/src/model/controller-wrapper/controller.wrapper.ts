import { NextFunction, Request, Response } from 'express';

export function controllerWrapper(
  controller: (req: Request, res: Response, next: NextFunction) => any,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
