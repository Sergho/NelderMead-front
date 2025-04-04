import express from 'express';
import { BACKEND_PORT, HOST } from '../../constants';
import { CORS, ROUTES } from '../constants';
import { OperationRequest } from '../types/operation-request.type';
import { OperationResponse } from '../types/operation-response.type';

export const startServer = () => {
  const app = express();
  app.use(CORS);

  for (const route in ROUTES) {
    app.get(route, (req: OperationRequest, res: OperationResponse): void => {
      const { first, second } = req.query;
      let result = String(ROUTES[route]([+first, +second]));
      res.json(result);
    });
  }

  app.listen(BACKEND_PORT, () => {
    console.log(`Backend started: ${HOST}:${BACKEND_PORT}`);
  });
};
