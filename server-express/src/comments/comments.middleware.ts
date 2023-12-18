import { NextFunction, Request, Response } from "express";
import { CommentsValidator } from "./comments.validator";

class CommentsMiddleWaresClass {
  validateCreationBody(req: Request, res: Response, next: NextFunction) {
    try {
      CommentsValidator.validateCreateBody(req.body);
      next();
    } catch (err: any) {
      res.send(err);
    }
  }
}

export const CommentsMiddleWares = new CommentsMiddleWaresClass();
