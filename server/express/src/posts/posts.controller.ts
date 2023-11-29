import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { PostsServiceV1_1 } from "./posts.service";

class PostsControllerClassV1_1 {
  async validateCreationBody(req: Request, res: Response, next: NextFunction) {
    try {
      const validateRes = Joi.object({
        title: Joi.string().min(20).max(100).required(),
        body: Joi.string().min(200).max(10000).required(),
      }).validate(req.body);
      if (validateRes.error) throw validateRes.error.details[0].message;
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  }
  //TODO:
  validatePage(num: number) {
    // console.log("Inside validate");
  }
  async create(req: Request, res: Response) {
    try {
      if (!req.session.user) throw { httpCode: 401, message: "Auth first" };
      res.send(
        await PostsServiceV1_1.create(
          req.body.title,
          req.body.body,
          req.session.user.id
        )
      );
    } catch (err: any) {
      res.status(err.httpCode).send(err.message);
    }
  }
  async getPostsByPage(req: Request, res: Response) {
    try {
      const validateRes = Joi.number().min(1).validate(+req.params.page);
      if (validateRes.error)
        throw { httpCode: 400, message: "The page is not correct" };
      res.send(await PostsServiceV1_1.getByPage(+req.params.page));
    } catch (err: any) {
      console.log(err);
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getPostsByAuthorAndPage(req: Request, res: Response) {
    try {
      const validateRes = Joi.number().min(1).validate(+req.params.page);
      if (validateRes.error)
        throw { httpCode: 400, message: "The page is not correct" };
      res.send(
        await PostsServiceV1_1.getByAuthorAndPage(
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
      if (!req.session.user) throw { httpCode: 401, message: "Auth first" };
      const validateRes = Joi.number().min(1).validate(+req.params.page);
      if (validateRes.error)
        throw { httpCode: 400, message: "The page is not correct" };
      res.send(
        await PostsServiceV1_1.getByAuthorAndPage(
          req.session.user.id,
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}
class PostsControllerClassV1_2 {}

export const PostsControllerV1_1 = new PostsControllerClassV1_1();
export const PostsControllerV1_2 = new PostsControllerClassV1_2();
