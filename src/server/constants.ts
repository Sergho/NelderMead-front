import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../constants';

export const CORS = cors({
  origin: `${HOST}:${FRONTEND_PORT}`,
});

export const GRAPH_BREAK_DIVERGENCE = 1000;
export const SOLUTION_LIMIT = 1000;

export const PARAMS_LIMITS: {
  [key: string]: {
    min: number;
    max?: number;
  };
} = {
  reflection: {
    min: 0.001,
  },
  expansion: {
    min: 1.001,
  },
  contraction: {
    min: 0.001,
    max: 0.999,
  },
  homothety: {
    min: 0.001,
    max: 0.999,
  },
  dispersion: {
    min: 0.0001,
  },
  iterationsLimit: {
    min: 1,
    max: 1000,
  },
};
