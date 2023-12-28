import { Router } from 'express';
import { GlobalMiddlewares } from './global.middlewares';

const middlewares = Router();

middlewares.use(GlobalMiddlewares.cookieSession);
middlewares.use(GlobalMiddlewares.cors);

export default middlewares;
