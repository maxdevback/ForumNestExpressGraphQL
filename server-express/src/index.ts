import express from 'express';
import { server } from './server';

export const app = express();

server.start();
