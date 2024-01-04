import express, { Application } from 'express';
import routes from '../../routes';

export const configureApp = async (app: Application) => {
  app.use(express.json());

  app.use(routes);
};
