import { NextFunction, Request, Response, json } from "express";
import { Validate } from "./validate";

class SharedMiddleWareClass {
  validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      Validate.validateAuth(req);
      next();
    } catch (err) {
      next(err);
    }
  }
  validatePage(req: Request, res: Response, next: NextFunction) {
    try {
      Validate.validatePage(+req.params.page);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const SharedMiddleWare = new SharedMiddleWareClass();
