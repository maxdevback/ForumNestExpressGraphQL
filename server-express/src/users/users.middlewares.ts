import { Request, Response, NextFunction } from "express";
import { UsersValidate } from "./users.validators";

class UsersMiddlewaresClass {
  validateRegisterBody(req: Request, res: Response, next: NextFunction) {
    try {
      UsersValidate.validateRegisterBody(req.body);
      next();
    } catch (err) {
      res.send(err);
    }
  }
  validateLoginBody(req: Request, res: Response, next: NextFunction) {
    try {
      UsersValidate.validateLoginBody(req.body);
      next();
    } catch (err) {
      res.send(err);
    }
  }
}

export const UsersMiddlewares = new UsersMiddlewaresClass();
