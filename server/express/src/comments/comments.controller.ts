import { Request, Response } from "express";
import { Validate } from "../utils/validate";
import { CommentsService } from "./comments.service";

class CommentsControllerClass {
  async create(req: Request, res: Response) {
    try {
      Validate.validateCommentsCreateBody(req.body);
      Validate.validateAuth(req);
      res.send(
        await CommentsService.create(
          req.session.user!._id,
          req.params.postId,
          req.body.body
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async createReplay(req: Request, res: Response) {
    try {
      Validate.validateCommentsCreateBody(req.body);
      Validate.validateAuth(req);
      res.send(
        await CommentsService.create(
          req.session.user!._id,
          req.params.postId,
          req.body.body,
          req.params.parentCommentId
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getCommentsByPostIdAndPage(req: Request, res: Response) {
    try {
      Validate.validatePage(+req.params.page);
      res.send();
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getReplaysByCommentIdAndPostIdAndPage(req: Request, res: Response) {
    try {
      Validate.validatePage(+req.params.page);
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const CommentsController = new CommentsControllerClass();
