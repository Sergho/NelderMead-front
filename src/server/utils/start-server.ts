import express from 'express';
import { BACKEND_PORT, HOST } from '../../constants';
import { CORS } from '../constants';
import { treeRouter } from '../routes/tree.routes';

export const startServer = () => {
  const app = express();
  app.use(CORS);

  app.use(treeRouter);

  app.listen(BACKEND_PORT, () => {
    console.log(`Backend started: ${HOST}:${BACKEND_PORT}`);
  });
};
