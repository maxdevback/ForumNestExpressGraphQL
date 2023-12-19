import { NextFunction, Request, Response } from "express";
import { Validate } from "./validate";

class SharedMiddleWareClass {
  validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hello");
      Validate.validateAuth(req);
      next();
    } catch (err) {
      res.send(err);
    }
  }
  validatePage(req: Request, res: Response, next: NextFunction) {
    try {
      Validate.validatePage(+req.params.page);
      next();
    } catch (err) {
      res.send(err);
    }
  }
}

export const SharedMiddleWare = new SharedMiddleWareClass();
