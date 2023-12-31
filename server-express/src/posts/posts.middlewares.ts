import { Request, Response, NextFunction } from "express";
import { PostsValidate } from "./posts.validators";

class PostsMiddlewaresClass {
  createValidationBody(req: Request, res: Response, next: NextFunction) {
    try {
      PostsValidate.validateCreationBody(req.body);
      next();
    } catch (err) {
      res.send(err);
    }
  }
  updateValidationBody(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.providedFields = PostsValidate.validateUpdateBody(req.body);
      next();
    } catch (err) {
      res.send(err);
    }
  }
}

export const PostsMiddlewares = new PostsMiddlewaresClass();
