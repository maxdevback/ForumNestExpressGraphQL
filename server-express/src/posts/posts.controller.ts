import { Request, Response } from 'express';
import { PostsService } from './posts.service';

class PostsControllerOldClass {
  async create(req: Request, res: Response) {
    res.send(
      await PostsService.create(
        req.body.title,
        req.body.body,
        req.session.user?._id,
      ),
    );
  }

  async getPostsByPage(req: Request, res: Response) {
    res.send(await PostsService.getByPageOld(+req.params.page));
  }

  async getByPostId(req: Request, res: Response) {
    res.send(await PostsService.getByPostIdOld(req.params.postId));
  }

  async getPostsByAuthorAndPage(req: Request, res: Response) {
    res.send(
      await PostsService.getByAuthorAndPageOld(
        req.params.authorId,
        +req.params.page,
      ),
    );
  }

  async getMyPostsByPage(req: Request, res: Response) {
    res.send(
      await PostsService.getByAuthorAndPageOld(
        req.session.user?._id,
        +req.params.page,
      ),
    );
  }

  async updatePostByPostId(req: Request, res: Response) {
    res.send(
      await PostsService.updateByPostIdAndAuthorId(
        req.params.postId,
        req.session.user?._id,
        res.locals.providedFields,
      ),
    );
  }

  async getAuthorByPostId(req: Request, res: Response) {
    res.send(await PostsService.getAuthorByPostId(req.params.postId));
  }
}
export const PostsController = new PostsControllerOldClass();
