import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { PostsService } from "./posts.service";

class PostsControllerClass {
  validateCreationBody(body: object) {
    const validateRes = Joi.object({
      title: Joi.string().min(20).max(100).required(),
      body: Joi.string().min(200).max(10000).required(),
    }).validate(body);
    if (validateRes.error) throw validateRes.error.details[0].message;
  }
  validateUpdateBody(body: object) {
    return Joi.object({
      title: Joi.string().min(20).max(100),
      body: Joi.string().min(200).max(10000),
    }).validate(body).value;
  }
  validatePage(page: number) {
    const validateRes = Joi.number().min(1).validate(page);
    if (validateRes.error)
      throw { httpCode: 400, message: "The page is not correct" };
  }
  validateAuth(req: Request) {
    if (!req.session.user) throw { httpCode: 401, message: "Auth first" };
  }
  async create(req: Request, res: Response) {
    try {
      this.validateAuth(req);
      this.validateCreationBody(req.body);
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
      this.validatePage(+req.params.page);
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
      this.validatePage(+req.params.page);
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
      this.validateAuth(req);
      this.validatePage(+req.params.page);
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
      this.validateAuth(req);
      const providedFields = this.validateUpdateBody(req.body);
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
