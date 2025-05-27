import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../constants';

export const CORS = cors({
  origin: `${HOST}:${FRONTEND_PORT}`,
});

export const GRAPH_BREAK_DIVERGENCE = 1000;
export const SOLUTION_LIMIT = 100;
