import { Request, Response, NextFunction } from 'express';
import { joiValidateRegisterBody } from './validators/joi.register.body';
import { joiValidateLoginBody } from './validators/joi.login.body';

class AuthMiddlewaresClass {
  validateRegisterBody(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('here');
      joiValidateRegisterBody(req.body);
      next();
    } catch (err) {
      next(err);
    }
  }

  validateLoginBody(req: Request, res: Response, next: NextFunction) {
    try {
      joiValidateLoginBody(req.body);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const AuthMiddlewares = new AuthMiddlewaresClass();
