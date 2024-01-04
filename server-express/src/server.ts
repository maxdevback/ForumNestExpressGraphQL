import { connect } from 'mongoose';
import { app } from '.';

import './types';
import './app/server/dotenv';

import { APP_INFO_CONFIG } from './config/app.info';
import { SECRET_CONFIG } from './config/secrets';

import { configureApp } from './app/server/configure.app';
import {
  configureMiddlewaresBeforeRouter,
  configureMiddlewaresAfterRouter,
} from './app/server/configure.middlewares';

const server = {
  _configure: function () {
    configureMiddlewaresBeforeRouter(app);

    configureApp(app);

    configureMiddlewaresAfterRouter(app);
  },

  start: function () {
    this._configure();

    app.listen(APP_INFO_CONFIG.PORT, async () => {
      await connect(SECRET_CONFIG.MONGODB_LINK);
      console.log(`The App has been started at ${APP_INFO_CONFIG.PORT} port`);
    });
  },
};
export { server };
