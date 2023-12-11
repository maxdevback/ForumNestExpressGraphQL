import { Request, Response } from "express";
import { Validate } from "../shared/validate";
import { LikesService } from "./likes.service";
class LikesControllerClass {
  async likePost(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      res.send(
        await LikesService.likeEntity(
          req.params.postId,
          "post",
          req.session.user!._id
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async likeComment(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      res.send(
        await LikesService.likeEntity(
          req.params.commentId,
          "comment",
          req.session.user!._id
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async isLikedEntity(req: Request, res: Response) {
    try {
      Validate.validateAuth(req);
      res.send(
        await LikesService.isLikedEntity(
          req.params.entityId,
          req.session.user!._id
        )
      );
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const LikesController = new LikesControllerClass();
