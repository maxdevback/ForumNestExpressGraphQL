import { Request, Response } from 'express';
import { LikesService } from './likes.service';
import { joiValidateAuth } from '../shared/validators/joi.validate.auth';
class LikesControllerClass {
  async likePost(req: Request, res: Response) {
    try {
      joiValidateAuth(req);
      res.send(
        await LikesService.likeEntity(
          req.params.postId,
          'post',
          req.session.user!._id,
          req.baseUrl.split('/')[2] as 'v1.1' | 'v1.2',
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async likeComment(req: Request, res: Response) {
    try {
      joiValidateAuth(req);
      res.send(
        await LikesService.likeEntity(
          req.params.commentId,
          'comment',
          req.session.user!._id,
          req.baseUrl.split('/')[2] as 'v1.1' | 'v1.2',
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async isLikedEntity(req: Request, res: Response) {
    try {
      joiValidateAuth(req);
      res.send(
        await LikesService.isLikedEntity(
          req.params.entityId,
          req.session.user!._id,
          req.baseUrl.split('/')[2] as 'v1.1' | 'v1.2',
        ),
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const LikesController = new LikesControllerClass();
