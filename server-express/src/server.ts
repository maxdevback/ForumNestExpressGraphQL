import { Application } from 'express';
import express from 'express';
import { connect } from 'mongoose';

//Dotenv
import { config } from 'dotenv';
config();

//Without export
import './types';

//Routes and middlewares
import { GlobalMiddlewares } from './global.middlewares';
import routes from './routes';

//Configs
import { appInfoConfig } from './config/config.app.info';
import { secretsConfig } from './config/config.sectrets';

export const configureApp = async (app: Application) => {
  app.use(express.json());

  app.use(GlobalMiddlewares.cors);
  app.use(GlobalMiddlewares.cookieSession);

  app.use(routes);

  app.use(GlobalMiddlewares.errorHandler);
};

export const startApp = async (app: Application) => {
  if (!secretsConfig.MONGODB_LINK || !appInfoConfig.PORT) {
    throw 'Something went wrong with env';
  }
  app.listen(appInfoConfig.PORT, async () => {
    await connect(secretsConfig.MONGODB_LINK);
    console.log(`The App has been started at ${appInfoConfig.PORT} port`);
  });
};
