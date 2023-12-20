import { Request, Response } from "express";
import { Validate } from "../shared/validate";
import { CommentsService } from "./comments.service";
import { CommentsValidator } from "./comments.validator";

class CommentsControllerClass {
  async create(req: Request, res: Response) {
    try {
      CommentsValidator.validateCreateBody(req.body);
      Validate.validateAuth(req);
      res.send(
        await CommentsService.create(
          {
            authorId: req.session.user!._id,
            username: req.session.user!.username,
            postId: req.params.postId,
            body: req.body.body as string,
            parentCommentId: req.body.commentParentId as string,
          },
          "v1.1"
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
          {
            authorId: req.session.user!._id,
            username: req.session.user!.username,
            postId: req.params.postId,
            body: req.body.body as string,
            parentCommentId: req.body.commentParentId as string,
          },
          "v1.1"
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
          +req.params.page,
          null
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
