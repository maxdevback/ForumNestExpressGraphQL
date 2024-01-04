import { Request, Response } from 'express';
import { CommentsService } from './comments.service';
import { CommentsValidator } from './comments.validator';
import { joiValidateAuth } from '../shared/validators/joi.validate.auth';
import { joiValidatePage } from '../shared/validators/joi.validate.page';

class CommentsControllerClass {
  async create(req: Request, res: Response) {
    try {
      CommentsValidator.validateCreateBody(req.body);
      joiValidateAuth(req);
      res.send(
        await CommentsService.create(
          {
            authorId: req.session.user!._id,
            username: req.session.user!.username,
            postId: req.params.postId,
            body: req.body.body as string,
            parentCommentId: req.body.commentParentId as string,
          },
          'v1.1',
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async createReplay(req: Request, res: Response) {
    try {
      CommentsValidator.validateCreateBody(req.body);
      joiValidateAuth(req);
      res.send(
        await CommentsService.create(
          {
            authorId: req.session.user!._id,
            username: req.session.user!.username,
            postId: req.params.postId,
            body: req.body.body as string,
            parentCommentId: req.body.commentParentId as string,
          },
          'v1.1',
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getCommentsByPostIdAndPage(req: Request, res: Response) {
    try {
      joiValidatePage(+req.params.page);
      res.send(
        await CommentsService.getCommentsByPostIdAndPage(
          req.params.postId,
          +req.params.page,
          null,
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getReplaysByCommentIdAndPostIdAndPage(req: Request, res: Response) {
    try {
      joiValidatePage(+req.params.page);
      res.send(
        await CommentsService.getReplaysByCommentIdAndPostIdAndPage(
          req.params.commentId,
          req.params.postId,
          +req.params.page,
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const CommentsController = new CommentsControllerClass();
