import { NextFunction, Request, Response } from "express";
import { PostsService } from "./posts.service";

class PostsControllerOldClass {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(
        await PostsService.create(
          req.body.title,
          req.body.body,
          req.session.user!._id
        )
      );
    } catch (err) {
      next(err);
    }
  }

  async getPostsByPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await PostsService.getByPageOld(+req.params.page));
    } catch (err: any) {
      next(err);
    }
  }

  async getByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await PostsService.getByPostIdOld(req.params.postId));
    } catch (err: any) {
      next(err);
    }
  }

  async getPostsByAuthorAndPage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.send(
        await PostsService.getByAuthorAndPageOld(
          req.params.authorId,
          +req.params.page
        )
      );
    } catch (err: any) {
      next(err);
    }
  }

  async getMyPostsByPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(
        await PostsService.getByAuthorAndPageOld(
          req.session.user!._id,
          +req.params.page
        )
      );
    } catch (err: any) {
      next(err);
    }
  }

  async updatePostByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(
        await PostsService.updateByPostIdAndAuthorId(
          req.params.postId,
          req.session.user!._id,
          res.locals.providedFields
        )
      );
    } catch (err: any) {
      next(err);
    }
  }

  async getAuthorByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await PostsService.getAuthorByPostId(req.params.postId));
    } catch (err: any) {
      next(err);
    }
  }
}
export const PostsController = new PostsControllerOldClass();
