import { Router } from 'express';
import { UsersController } from './users.controller';
import { SharedMiddleWare } from '../shared/middlewares';
import { controllerWrapper } from '../model/controller-wrapper/controller.wrapper';

const userRouter = Router();

userRouter.delete(
  '/v1.1/delete',
  SharedMiddleWare.validateAuth,
  controllerWrapper(UsersController.deleteAccount),
);

const UsersRouter = (router: Router) => {
  router.use('/users', userRouter);
};

export default UsersRouter;
