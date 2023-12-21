import { Request, Response } from "express";
import { Validate } from "../shared/validate";
import { PostsService } from "./posts.service";
import { PostsValidate } from "./posts.validators";

class PostsControllerOldClass {
  async create(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.create(
          req.body.title,
          req.body.body,
          req.session.user!._id
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByPage(req: Request, res: Response) {
    try {
      res.send(await PostsService.getByPageOld(+req.params.page));
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getByPostId(req: Request, res: Response) {
    try {
      res.send(await PostsService.getByPostIdOld(req.params.postId));
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByAuthorAndPage(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByAuthorAndPageOld(
          req.params.authorId,
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getMyPostsByPage(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByAuthorAndPageOld(
          req.session.user!._id,
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async updatePostByPostId(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.updateByPostIdAndAuthorId(
          req.params.postId,
          req.session.user!._id,
          res.locals.providedFields
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getAuthorByPostId(req: Request, res: Response) {
    try {
      res.send(await PostsService.getAuthorByPostId(req.params.postId));
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}
export const PostsController = new PostsControllerOldClass();
