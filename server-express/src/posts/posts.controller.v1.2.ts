import { NextFunction, Request, Response } from 'express';
import { PostsService } from './posts.service';

class PostsControllerV1_2Class {
  async getAuthorByPostId(req: Request, res: Response) {
    res.send(await PostsService.getAuthorByPostId(req.params.postId));
  }

  async getMyPostsByPage(req: Request, res: Response) {
    res.send(
      await PostsService.getByAuthorAndPage(
        req.session.user!._id,
        +req.params.page,
      ),
    );
  }

  async getPostsByAuthorAndPage(req: Request, res: Response) {
    res.send(
      await PostsService.getByAuthorAndPage(
        req.params.authorId,
        +req.params.page,
      ),
    );
  }

  async getPostsByPage(req: Request, res: Response) {
    res.send(await PostsService.getByPage(+req.params.page));
  }

  async getByPostId(req: Request, res: Response) {
    res.send(await PostsService.getByPostId(req.params.postId));
  }
}

export const PostsControllerV1_2 = new PostsControllerV1_2Class();
