import { Request, Response } from "express";
import { Validate } from "../server/validate";
import { CommentsService } from "./comments.service";
import { CommentsValidator } from "./comments.validator";

class CommentsControllerClass {
  async create(req: Request, res: Response) {
    try {
      CommentsValidator.validateCreateBody(req.body);
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
      CommentsValidator.validateCreateBody(req.body);
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
      res.send(
        await CommentsService.getCommentsByPostIdAndPage(
          req.params.postId,
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getReplaysByCommentIdAndPostIdAndPage(req: Request, res: Response) {
    try {
      Validate.validatePage(+req.params.page);
      res.send(
        await CommentsService.getReplaysByCommentIdAndPostIdAndPage(
          req.params.commentId,
          req.params.postId,
          +req.params.page
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const CommentsController = new CommentsControllerClass();
