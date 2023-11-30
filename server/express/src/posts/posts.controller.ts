import { Request, Response } from "express";
import { Validate } from "../utils/validate";
import { PostsService } from "./posts.service";

class PostsControllerClass {
  async create(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      Validate.validatePostCreationBody(req.body);
      res.send(
        await PostsService.create(
          req.body.title,
          req.body.body,
          req.session.user!._id
        )
      );
    } catch (err: any) {
      console.log(err);
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByPage(req: Request, res: Response) {
    try {
      Validate.validatePage(+req.params.page);
      //console.log(req.baseUrl.split("/")[2]);
      res.send(await PostsService.getByPage(+req.params.page));
    } catch (err: any) {
      console.log(err);
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
  async getPostsByAuthorAndPage(req: Request, res: Response) {
    try {
      Validate.validatePage(+req.params.page);
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
  async getMyPostsByPage(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      Validate.validatePage(+req.params.page);
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
  async updatePostByPostId(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      const providedFields = Validate.validatePostUpdateBody(req.body);
      res.send(
        await PostsService.updateByPostIdAndAuthorId(
          req.params.postId,
          req.session.user!._id,
          providedFields
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
