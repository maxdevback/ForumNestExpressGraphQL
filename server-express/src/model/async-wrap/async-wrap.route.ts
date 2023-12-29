import { NextFunction, Request, Response } from 'express';
import { routeType } from './async-wrap.interfaces';

export const asyncWrap = async (
  req: Request,
  res: Response,
  next: NextFunction,
  route: routeType,
) => {
  try {
    await route(req, res);
  } catch (err) {
    next(err);
  }
};
