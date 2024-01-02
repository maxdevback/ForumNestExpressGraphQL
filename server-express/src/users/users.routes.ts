import { Router } from 'express';
import { UsersController } from './users.controller';
import { SharedMiddleWare } from '../shared/shared.middlewares';

const router = Router();
router.delete(
  '/v1.1/delete',
  SharedMiddleWare.validateAuth,
  UsersController.deleteAccount,
);

const UsersRouter = (router: Router) => {
  router.use('/users', router);
};

export default UsersRouter;
