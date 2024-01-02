import { Request, Response, NextFunction } from 'express';
import { PostsValidate } from './posts.validators';

class PostsMiddlewaresClass {
  createValidationBody(req: Request, res: Response, next: NextFunction) {
    PostsValidate.validateCreationBody(req.body);
    next();
  }

  updateValidationBody(req: Request, res: Response, next: NextFunction) {
    res.locals.providedFields = PostsValidate.validateUpdateBody(req.body);
    next();
  }
}

export const PostsMiddlewares = new PostsMiddlewaresClass();
