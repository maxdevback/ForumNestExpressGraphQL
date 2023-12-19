import { Request, Response } from "express";
import { PostsService } from "./posts.service";

class PostsControllerClass {
  async create(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.create(
          req.body.title,
          req.body.body,
          req.session.user!._id,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByPage(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByPage(
          +req.params.page,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getByPostId(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByPostId(
          req.params.postId,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByAuthorAndPage(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByAuthorAndPage(
          req.params.authorId,
          +req.params.page,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getMyPostsByPage(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByAuthorAndPage(
          req.session.user!._id,
          +req.params.page,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
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
          res.locals.providedFields,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
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
export const PostsController = new PostsControllerClass();
