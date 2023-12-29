import express from 'express';
import { configureApp, startApp } from './server';

const app = express();

const bootstrap = async () => {
  await configureApp(app);
  await startApp(app);
};
bootstrap();
