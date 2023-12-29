import { Router } from 'express';
import { AuthControllerOld } from './auth.controller.old';
import { AuthController_v1_2 } from './auth.controller.v1.2';
import { AuthMiddlewares } from './auth.middlewares';
import { asyncWrap } from '../model/async-wrap/async-wrap.route';

const authRouter = Router();

authRouter.get('/v1.1/my', AuthControllerOld.getMyInfo);
authRouter.post(
  '/v1.1/login',
  AuthMiddlewares.validateLoginBody,
  AuthControllerOld.login,
);
authRouter.post(
  '/v1.2/login',
  AuthMiddlewares.validateLoginBody,
  (req, res, next) => asyncWrap(req, res, next, AuthController_v1_2.login),
);
authRouter.post(
  '/v1.2/register',
  AuthMiddlewares.validateRegisterBody,
  (req, res, next) => asyncWrap(req, res, next, AuthControllerOld.register),
);
authRouter.delete('/v1.1/logout', (req, res, next) =>
  asyncWrap(req, res, next, AuthControllerOld.logout),
);

const AuthRouter = (router: Router) => {
  router.use('/auth', authRouter);
};

export default AuthRouter;
