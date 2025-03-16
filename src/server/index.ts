import express from 'express';
import { config } from 'dotenv';
import { CORS, DLL_PATH, ROUTES } from './settings';
import { OperationResponse } from './types/operation-response.type';
import { OperationRequest } from './types/operation-request.type';

config();

const app = express();
app.use(CORS);

for (const route in ROUTES) {
  app.get(route, (req: OperationRequest, res: OperationResponse): void => {
    const { first, second } = req.query;
    let result = String(ROUTES[route]([+first, +second]));
    res.json(result);
  });
}

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Backend started: ${process.env.HOST}:${process.env.BACKEND_PORT}`);
});
