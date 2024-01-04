import { NextFunction, Request, Response, json } from 'express';
import { joiValidateAuth } from './validators/joi.validate.auth';
import { joiValidatePage } from './validators/joi.validate.page';

class SharedMiddleWareClass {
  validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      joiValidateAuth(req);
      next();
    } catch (err) {
      next(err);
    }
  }
  validatePage(req: Request, res: Response, next: NextFunction) {
    try {
      joiValidatePage(+req.params.page);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const SharedMiddleWare = new SharedMiddleWareClass();
