import { Router } from 'express';
import { AuthControllerOld } from './auth.controller.old';
import { AuthController_v1_2 } from './auth.controller.v1.2';
import { AuthMiddlewares } from './auth.middlewares';
import { controllerWrapper } from '../model/controller-wrapper/controller.wrapper';

const authRouter = Router();

authRouter.get('/v1.1/me', AuthControllerOld.getMyInfo);
authRouter.post(
  '/v1.1/login',
  AuthMiddlewares.validateLoginBody,
  controllerWrapper(AuthControllerOld.login),
);

authRouter.post(
  '/v1.2/login',
  AuthMiddlewares.validateLoginBody,
  controllerWrapper(AuthController_v1_2.login),
);

authRouter.post(
  '/v1.2/register',
  AuthMiddlewares.validateRegisterBody,
  controllerWrapper(AuthControllerOld.register),
);

authRouter.delete('/v1.1/logout', controllerWrapper(AuthControllerOld.logout));

const AuthRouter = (router: Router) => {
  router.use('/auth', authRouter);
};

export default AuthRouter;
