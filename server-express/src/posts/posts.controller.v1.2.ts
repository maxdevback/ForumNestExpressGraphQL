import { NextFunction, Request, Response } from "express";
import { PostsService } from "./posts.service";

class PostsControllerV1_2Class {
  async getAuthorByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await PostsService.getAuthorByPostId(req.params.postId));
    } catch (err: any) {
      next(err);
    }
  }

  async getMyPostsByPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(
        await PostsService.getByAuthorAndPage(
          req.session.user!._id,
          +req.params.page
        )
      );
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
        await PostsService.getByAuthorAndPage(
          req.params.authorId,
          +req.params.page
        )
      );
    } catch (err: any) {
      next(err);
    }
  }

  async getPostsByPage(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await PostsService.getByPage(+req.params.page));
    } catch (err: any) {
      next(err);
    }
  }

  async getByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await PostsService.getByPostId(req.params.postId));
    } catch (err: any) {
      next(err);
    }
  }
}

export const PostsControllerV1_2 = new PostsControllerV1_2Class();
