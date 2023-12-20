import { Request, Response, NextFunction } from "express";
import { AuthValidate } from "./auth.validate";

class AuthMiddlewaresClass {
  validateRegisterBody(req: Request, res: Response, next: NextFunction) {
    try {
      AuthValidate.validateRegisterBody(req.body);
      next();
    } catch (err) {
      res.send(err);
    }
  }
  validateLoginBody(req: Request, res: Response, next: NextFunction) {
    try {
      AuthValidate.validateLoginBody(req.body);
      next();
    } catch (err) {
      res.send(err);
    }
  }
}

export const AuthMiddlewares = new AuthMiddlewaresClass();
