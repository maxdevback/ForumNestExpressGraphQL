import { Request, Response, NextFunction } from 'express';
import { joiValidateRegisterBody } from './validators/joi.validate.register-body';
import { joiValidateLoginBody } from './validators/joi.validate.login-body';

class AuthMiddlewaresClass {
  validateRegisterBody(req: Request, res: Response, next: NextFunction) {
    try {
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
