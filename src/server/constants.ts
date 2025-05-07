import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../constants';

export const CORS = cors({
  origin: `${HOST}:${FRONTEND_PORT}`,
});
