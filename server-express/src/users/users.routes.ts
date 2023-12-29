import { Router } from 'express';
import { UsersController } from './users.controller';
import { SharedMiddleWare } from '../shared/shared.middlewares';
import { asyncWrap } from '../model/async-wrap/async-wrap.route';

const router = Router();
router.delete(
  '/v1.1/delete',
  SharedMiddleWare.validateAuth,
  (req, res, next) => {
    asyncWrap(req, res, next, UsersController.deleteAccount);
  },
);

const UsersRouter = (router: Router) => {
  router.use('/users', router);
};

export default UsersRouter;
