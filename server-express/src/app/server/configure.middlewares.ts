import { Application } from 'express';
import { serverCookieSessionMiddleware } from './middlewares/cookie.session';
import { serverCorsMiddleware } from './middlewares/cors';
import { serverErrorHandler } from './middlewares/error.handler';

export const configureMiddlewaresBeforeRouter = (app: Application) => {
  app.use(serverCookieSessionMiddleware);
  app.use(serverCorsMiddleware);
};

export const configureMiddlewaresAfterRouter = (app: Application) => {
  app.use(serverErrorHandler);
};
