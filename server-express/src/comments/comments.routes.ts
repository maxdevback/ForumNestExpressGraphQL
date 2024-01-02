import { Router } from 'express';
import { CommentsController } from './comments.controller';

const router = Router();
router.post('/:postId', (req, res) => CommentsController.create(req, res));
router.post('/:postId/:parentCommentId', (req, res) =>
  CommentsController.createReplay(req, res),
);
router.get('/:postId/:page', (req, res) =>
  CommentsController.getCommentsByPostIdAndPage(req, res),
);
router.get('/:postId/:commentId/:page', (req, res) =>
  CommentsController.getReplaysByCommentIdAndPostIdAndPage(req, res),
);

const commentsRouter = Router();

commentsRouter.use('/v1.1', router);
commentsRouter.use('/v1.2', router);

const CommentsRouter = (router: Router) => {
  router.use('/comments', commentsRouter);
};

export default CommentsRouter;
