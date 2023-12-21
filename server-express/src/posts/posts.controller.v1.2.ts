import { Request, Response } from "express";
import { PostsService } from "./posts.service";

class PostsControllerV1_2Class {
  async getAuthorByPostId(req: Request, res: Response) {
    try {
      res.send(await PostsService.getAuthorByPostId(req.params.postId));
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getMyPostsByPage(req: Request, res: Response) {
    try {
      res.send(
        await PostsService.getByAuthorAndPage(
          req.session.user!._id,
          +req.params.page
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
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByPage(req: Request, res: Response) {
    try {
      res.send(await PostsService.getByPage(+req.params.page));
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getByPostId(req: Request, res: Response) {
    try {
      res.send(await PostsService.getByPostId(req.params.postId));
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const PostsControllerV1_2 = new PostsControllerV1_2Class();
